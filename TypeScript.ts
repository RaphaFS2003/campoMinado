type square = {

    row: number,
    column: number,
    state: "closed",
    hasMine: boolean,
    nearMines: number

};

type Matriz = square[][];

const Square: square = {
    row: 0,
    column: 0,
    state: "closed",
    hasMine: false,
    nearMines: 0,
};

function matriz (linhas:number ,colunas:number): Matriz {

    let mat: Matriz = [],x: square;
    for(let i=0; i<linhas; i++ ){

        let elemento: square[] = [];

        for(let j=0; j<colunas;j++){
            x = {...Square};
            elemento.push(x);
            elemento[j].row = i;
            elemento[j].column = j;
        }

        mat.push(elemento);

    }

    return mat;

}

function sort_minas (mat: Matriz, quante_minas: number):void{

    let linha:number,coluna:number;

    while(quante_minas > 0){

        linha = Math.round(Math.random()*(mat.length-1));
        coluna = Math.round(Math.random()*(mat[0].length-1));

        if(mat[linha][coluna].hasMine == false){
            mat[linha][coluna].hasMine = true;
            quante_minas--;
        }

    }

}

function conta(mat: Matriz,linha:number,coluna:number):void{

    let cont=0,i:number,j:number;
    if(linha == 0 && coluna == 0){//canto superior esquerdo

        for(i=(linha); i<=(linha+1); i++){
            for(j=(coluna); j<=(coluna+1); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(linha == 0 && coluna == (mat[0].length-1)){//canto superior direito

        for(i=(linha); i<=(linha+1); i++){
            for(j=(coluna-1); j<=(coluna); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(linha == (mat.length-1) && coluna == 0){//canto inferior esquerdo

        for(i=(linha-1); i<=(linha); i++){
            for(j=(coluna); j<=(coluna+1); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(linha == (mat.length-1) && coluna == (mat[0].length-1)){//canto inferior direito

        for(i=(linha-1); i<=(linha); i++){
            for(j=(coluna-1); j<=(coluna); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(linha == 0){//parede superior

        for(i=(linha); i<=(linha+1); i++){
            for(j=(coluna-1); j<=(coluna+1); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(coluna == 0){//parede esquerda

        for(i=(linha-1); i<=(linha+1); i++){
            for(j=(coluna); j<=(coluna+1); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(coluna == (mat[0].length-1)){//parede direita

        for(i=(linha-1); i<=(linha+1); i++){
            for(j=(coluna-1); j<=(coluna); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else if(linha == (mat.length-1)){//parede inferior 

        for(i=(linha-1); i<=(linha); i++){
            for(j=(coluna-1); j<=(coluna+1); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

    }else {

        for(i=(linha-1); i<=(linha+1); i++){
            for(j=(coluna-1); j<=(coluna+1); j++){
                if(i != linha || coluna != j){
                    if(mat[i][j].hasMine == true){
                        cont++;
                    }
                }
            }
        }

        /*
        mat[linha-1][coluna];//cima
        mat[linha-1][coluna+1];//cima depois
        mat[linha-1][coluna-1];//cima antes

        mat[linha][coluna+1];//depois
        mat[linha][coluna-1];//antes
        
        mat[linha+1][coluna];//baixo
        mat[linha+1][coluna+1];//baixo depois
        mat[linha+1][coluna-1];//baixo antes
        */
    }
    mat[linha][coluna].nearMines = cont;
}

function conta_campo(mat: Matriz):void{
    let i:number,j:number;
    for(i=0;i<mat.length;i++){
        for(j=0;j<mat[0].length;j++){
            conta(mat,i,j);
        }
    }
}

function imprimir(mat:Matriz):void{
    let i:number,j:number,linha:string;
    for(i=0;i<mat.length;i++){
        linha = "";
        for(j=0;j<mat[0].length;j++){
            if(mat[i][j].hasMine == true){
                linha += "[*]";
            }else linha+=("[" + mat[i][j].nearMines + "]");
        }
        console.log(linha);
    }
}

const campoMinado: Matriz = matriz(5,5);
const gabaritoCampoMinado: Matriz = structuredClone(campoMinado);
sort_minas(gabaritoCampoMinado, 5);
conta_campo(gabaritoCampoMinado);
imprimir(campoMinado);
imprimir(gabaritoCampoMinado);
/*
let mat = matriz(5,5);

sort_minas(mat,3);

conta_campo(mat);

imprimir(mat);
*/
