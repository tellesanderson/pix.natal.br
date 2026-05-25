import sys
import subprocess
import os
import json
import re
import asyncio

# Ensure edge-tts is installed
try:
    import edge_tts
except ImportError:
    print("edge-tts not found. Installing edge-tts python library...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
        import edge_tts
    except Exception as e:
        print(f"Error installing edge-tts: {e}")
        sys.exit(1)

def clean_story_text(text):
    if not text:
        return ""
    # Clean backticks
    cleaned = text.replace("`", "")
    # Strip out citation markers if any (e.g. [cite: ...])
    cleaned = re.sub(r"\s*\[cite:\s*[^\]]+\]", "", cleaned)
    # Strip HTML
    cleaned = re.sub(r"<[^>]*>", "", cleaned)

    patterns = [
        # Page jump instructions typical in CYOA books
        r"\s*Comece\s+lendo\s+o\s+trecho\s+\d+\.?",
        r"\s*Vá\s+para\s+\d+\.?",
        r"\s*leia\s+o\s+trecho\s+\d+\.?",
        r"\s*leia\s+o\s+\d+\.?",
        r"\s*Se\s+quiser\s+[^,.]+(?:,\s*|\s+)Vá\s+para\s+\d+\.?",
        r"\s*Se\s+prefere\s+[^,.]+(?:,\s*|\s+)Vá\s+para\s+\d+\.?"
    ]

    for pattern in patterns:
        cleaned = re.sub(pattern, "", cleaned, flags=re.IGNORECASE)

    return cleaned.strip()

async def main():
    # 1. Run Node.js script to extract JSON data
    print("Extracting text from game.js using Node...")
    try:
        subprocess.run(["node", "dump_game_text.mjs"], check=True)
    except Exception as e:
        print(f"Failed to run dump_game_text.mjs: {e}")
        sys.exit(1)

    # 2. Load the exported JSON
    json_path = "./my-game/game_text.json"
    if not os.path.exists(json_path):
        print(f"Error: JSON file not found at {json_path}")
        sys.exit(1)

    with open(json_path, "r", encoding="utf-8") as f:
        nodes = json.load(f)

    # 3. Create audio directory if it doesn't exist
    os.makedirs("./my-game/audio", exist_ok=True)

    voice = "pt-BR-AntonioNeural"

    print(f"\nStarting TTS generation with voice: {voice}")
    print(f"Found {len(nodes)} text nodes.")

    for node in nodes:
        node_id = node["id"]
        raw_text = node["text"]

        cleaned_text = clean_story_text(raw_text)
        if not cleaned_text:
            print(f"Skipping node {node_id} (empty text)")
            continue

        output_file = f"./my-game/audio/{node_id}.mp3"
        
        # Don't recreate if it already exists (saves network/time)
        if os.path.exists(output_file):
            print(f"Audio for node {node_id} already exists. Skipping.")
            continue

        print(f"Generating audio for node {node_id}...")
        try:
            communicate = edge_tts.Communicate(cleaned_text, voice)
            await communicate.save(output_file)
        except Exception as e:
            print(f"Error generating audio for node {node_id}: {e}")

    # 4. Clean up temporary JSON file
    if os.path.exists(json_path):
        os.remove(json_path)

    print("\nAll audio files generated successfully inside ./my-game/audio/")

if __name__ == "__main__":
    asyncio.run(main())
