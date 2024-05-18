body {
    font-family: Arial, sans-serif;
    margin: 0;
    background-color: #000;
    color: #fff;
    overflow: hidden;
}

#particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
}

header {
    background-color: #000;
    padding: 20px;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
}

header h1 {
    margin: 0;
    color: #00ff00;
}

nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    color: #00ff00;
    text-decoration: none;
}

section {
    padding: 60px 20px 20px 20px;
    margin-top: 80px;
}

#servicos ul {
    list-style-type: none;
    padding: 0;
}

#servicos ul li {
    background-color: #333;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}

.slider {
    display: flex;
    overflow: hidden;
    height: 200px;
}

.slider img {
    width: 100%;
    transition: transform 0.5s ease;
}

footer {
    background-color: #000;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1;
}