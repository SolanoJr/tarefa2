let gui = {};

let objs = [
    'A',
    'B',
    'C',
    'D',
    'E'
];

let interacoes = [
    {tipo: 'conexao', obj1: 'A', obj2: 'B', acao: 'B ok'},    
    {tipo: 'auto', obj: 'C', depende_de_acoes: ['B ok'] },
    {tipo: 'mostra', obj1: 'C', obj2: 'D'},
    {tipo: 'mostra', obj1: 'D', obj2: 'E'},
   
];

let acoes_realizadas = [];


// clicou agora...
let obj1 = null;
let obj2 = null;


function main() {
    for (const obj of objs)
    {
        gui[obj] = document.querySelector( '#'+obj );
        gui[obj].classList.add("obj");

        gui[obj].onmouseenter = function() {
            this.classList.add("state_focus");
        };

        gui[obj].onmouseleave = function() {
            this.classList.remove("state_focus");
        };

        gui[obj].onclick = on_obj_click;    
    }
}

function mostrar(meu_id)
{
    if ( meu_id === 'C')

    gui[interacoes[2].obj2].style.display = 'block';

if ( meu_id === 'D')

    gui[interacoes[3].obj2].style.display = 'block';


}

function on_obj_click(e)
{
    let meu_id = this.getAttribute('id');

    // alert('clicou no objeto: ' + meu_id );

    e.stopPropagation();


    if ( obj1 == null )
    {
        obj1 = meu_id;
        gui[obj1].classList.add("state_selected");

        verifica_interacoes_de_valor();
    }        
    else if ( obj2 == null )
    {
        obj2 = meu_id;
        gui[obj2].classList.add("state_selected");

        verifica_interacoes_de_conexao();
    }

    mostrar(meu_id)

    verifica_interacoes_auto();
}


function verifica_interacoes_de_conexao()
{
    for (let i = 0; i < interacoes.length; i++)
    {
        let interacao = interacoes[i];

        if ( interacao.tipo == 'conexao' )
        {
            if ( interacao.obj1 == obj1 && interacao.obj2 == obj2 )
            {
                interacao_ok( interacao );
            }
        }
    }

    de_select();
}


function verifica_interacoes_de_valor()
{
    for (let i = 0; i < interacoes.length; i++)
    {
        let interacao = interacoes[i];

        if ( interacao.tipo == 'valor' )
        {
            if ( interacao.obj == obj1 )
            {
                let s = prompt('Digite valor:');
                if ( s != null )
                {
                    if ( s == interacao.valor )
                    {
                        interacao_ok( interacao );
                    }

                    de_select();
                }
            }
        }
    }

}


function verifica_interacoes_auto()
{
    // vê que coisas podem ser disparadas com o que já foi feito...
    
    for (let interacao of interacoes)
    {
        if ( interacao.tipo == 'auto' )
        {
            let tudo_ok = true;
            for ( let acao of interacao.depende_de_acoes )
                if ( !acoes_realizadas.includes(acao) )
                {
                    tudo_ok = false;
                    break;
                }

            if ( tudo_ok )
                interacao_ok( interacao );
        }
    }
};


function de_select()
{
    // tira o estado de selected dos objetos clicados

    if ( obj1 != null)
        gui[obj1].classList.remove("state_selected");

    if ( obj2 != null)
        gui[obj2].classList.remove("state_selected");

    obj1 = null;
    obj2 = null;
}

function interacao_ok(interacao)
{
    acoes_realizadas.push( interacao.acao );

    if ( interacao.tipo == 'valor' )
        gui[ interacao.obj ].classList.add("state_ok");
    else if ( interacao.tipo == 'conexao' )
    {
        gui[ interacao.obj1 ].classList.add("state_ok");
        gui[ interacao.obj2 ].classList.add("state_ok");    
    }
    else if ( interacao.tipo == 'auto')
        gui[ interacao.obj ].style.display = 'block';




}