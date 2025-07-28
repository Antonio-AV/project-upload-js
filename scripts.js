const uploadBtn = document.getElementById('upload-btn');
const imageUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    imageUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => { //Promise é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        }
        leitor.onerror = () => {
            reject('Erro na leitura do arquivo ' + arquivo.name);
        }
        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector('.main-imagem');
const nomeImagem = document.querySelector('.container-imagem-nome p');

imageUpload.addEventListener('change', async (evento) => { // o async permite usar await dentro da função
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); //o await espera a Promise ser resolvida
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro ao carregar a imagem:", erro);
        }
    }
})

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-tag')) {
        const tagParaRemover = evento.target.parentElement;
        listaTags.removeChild(tagParaRemover);
    }
})

const tagsDisponiveis = ['Front-end', 'Back-end', 'Full-stack', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js'];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000); // Simula uma verificação assíncrona com um atraso de 1 segundo
    });
}

inputTags.addEventListener('keypress', async (evento) => {
    if (evento.key == 'Enter') {
        evento.preventDefault(); // Impede o comportamento padrão de adicionar uma nova linha
        const tagTexto = inputTags.value.trim();
        if (tagTexto != '') {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement('li');
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = ''; // Limpa o campo de entrada após adicionar a tag
                } else {
                    console.warn(`Tag "${tagTexto}" não disponível.`);
                    alert(`Tag "${tagTexto}" não disponível.`);
                }
            } catch (erro) {
                console.error("Erro ao verificar a tag:", erro);
            }
        }
    }
});

const botaoPublicar = document.querySelector('.botao-publicar');

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    // Simula uma chamada assíncrona para publicar o projeto
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5; // 80% de chance de sucesso
            if (deuCerto) {
                resolve('Projeto publicado com sucesso!');   
            } else {
                reject('Erro ao publicar o projeto. Tente novamente mais tarde.');
            }
        }, 2000); // Simula um atraso de 2 segundos
    });
}

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map(tag => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo Certo! Projeto publicado com sucesso!");
    } catch (erro) {
        console.error(erro);
        alert("Ops! Algo deu errado. Tente novamente mais tarde.");
    }

})

const botaoDescartar = document.querySelector('.botao-descartar');
botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector('form');
    formulario.reset();

    imagemPrincipal.src = './img/imagem1.png'; // Reseta a imagem para o estado inicial
    nomeImagem.textContent = 'image_projeto.png'; // Reseta o nome da imagem

    listaTags.innerHTML = ''; // Limpa a lista de tags
});