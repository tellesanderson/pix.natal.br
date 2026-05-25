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
        # Specific page instructions with dynamic numbers (must run before general ones)
        r"Se quiser tentar abri-la, vá para \d+\.\s*Se quiser tentar o outro corredor, vá para \d+\.?",
        r"Se você deseja convidar Parx para participar do roubo, vá para \d+\.\s*Se não confia no clérigo trapaceiro e prefere agir sozinho, vá para \d+\.?",
        r"Se quiser seguir o conselho de Parx, vá para \d+\.\s*Prefere usar sua estratégia costumeira, protegido pela escuridão\? Vá para \d+\.?",
        r"Se ainda não investigou o cetro e quer fazê-lo agora, vá para \d+\.\s*Se prefere abandonar a sala, vá para \d+\.?",
        r"Se quer procurar armadilhas, vá para \d+\.\s*Se quiser ignorar armadilhas e apenas abrir a porta, \d+\.?",
        r"Se quiser dar uma escutadela na porta antes de tentar arrombá-la, leia o \d+\.\s*Se quiser voltar e pegar o caminho da esquerda, vá para \d+\.\s*Se quiser poupar tempo e meter o pé na porta, vá para \d+\.?",
        r"Enquanto espera a noite cair, vá para \d+\.?",
        r"Se quiser correr o risco e tocar o cajado, vá para \d+\.\s*Se ainda não investigou a estatueta e quer fazê-lo agora, vá para \d+\.\s*Se quer sair da sala sem tocar em mais nada, vá para \d+\.?",
        r"Se você aceita o convite de Parx para um assalto, vá para \d+\.\s*Se prefere deixar o homem seguir em paz, vá para \d+\.?",
        r"Resmungando, você espera o anoitecer\. Vá para \d+\.?",
        r"Uma espada recurvada dos salteadores do deserto\.\s*Se quiser pegá-la, vá para \d+\.\s*Uma lança prateada, com dragões esculpidos no cabo\.\s*Se quiser agarrá-la, vá para \d+\.\s*Um elmo dourado com a forma de uma concha\.\s*Se quiser colocá-lo, vá para \d+\.\s*Um colar de contas vermelhas\.\s*Para pegá-lo, vá para \d+\.?",
        r"Se quiser deixar a tarefa para Parx, vá para \d+\.\s*Se quiser usar seu próprio poder, vá para \d+\.?",
        r"Se você quiser colar o ouvido à porta e escutar, vá para \d+\.\s*Se acha que pode haver uma armadilha na porta, vá para \d+\.?",
        r"Se quiser roubar a adaga, vá para \d+\.\s*Se está satisfeito com a bolsa de moedas, vá para \d+\.?",
        r"Se quiser mexer na tocha, vá para \d+\.\s*Se acha melhor procurar armadilhas antes de mexer na tocha, vá para \d+\.?",
        r"Se quer forçar a fechadura com suas ferramentas, vá para \d+\.\s*Se quiser voltar e pegar o caminho da esquerda, vá para \d+\.?",
        r"Se quiser pegá-la, vá para \d+\.\s*Um cetro, suspenso na parede, tendo em sua ponta um cristal transparente\.\s*Se quiser pegá-lo, vá para \d+\.\s*Se prefere deixar tudo onde está, vá para \d+\.?",
        r"Se quiser usar suas ferramentas para destrancá-la, vá para \d+\.\s*Se quiser tentar o outro corredor, vá para \d+\.?",
        r"Se quiser apresentar-se como negociante de artefatos mágicos, vá para \d+\.\s*Se prefere agir sob o disfarce de emissário da Guilda, vá para \d+\.?",
        r"Se quiser procurar armadilhas na porta, vá para \d+\.\s*Se quiser tentar abrir a porta, vá para \d+\.\s*Se quiser tentar o outro corredor, vá para \d+\.?",
        r"Se quiser pegar o caminho da direita, vá para \d+\.\s*Se prefere o da esquerda, vá para \d+\.?",
        r"Vamos, pois, à procura do bom Mestre Arsenal\. Vá para \d+\.?",
        r"Três objetos estão ao seu alcance:",
        
        # General/fallback page instructions (must run last)
        r"Comece lendo o trecho \d+\.?",
        r"Vá para \d+\.?"
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
