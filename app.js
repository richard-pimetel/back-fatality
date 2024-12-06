const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

const funcoes = require('./module/functions.js')

app.use((request, response, next) =>{

    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET')

    app.use(cors()) 

    next()
})


app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    let info = funcoes.obterCursos()

    if(info){
        response.status(200)
        response.json(info)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
    let status1 = request.query.status1
    let curso = request.query.curso
    let status2 = request.query.status2
    let ano = request.query.ano

    let info = funcoes.aplicarFiltros(status1, curso, status2, ano)
    console.log(status1)
    console.log(curso)
    console.log(status2)
    console.log(ano)

    if(info){
        response.status(200)
        response.json(info)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})

app.get('/v1/lion-school/alunos', cors(), async function(request, response){

    let info = funcoes.obterAlunos()

    if(info){
        response.status(200)
        response.json(info)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response){

    let matricula = request.params.matricula

    let info = funcoes.localizarAluno(matricula)
    if(info){
        response.status(200)
        response.json(info)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }

})

app.get('/v1/lion-school/alunos/cursos/:curso', cors(), async function(request, response){

    let curso = request.params.curso

    let info = funcoes.alunosPorCurso(curso)

    if(info){
        response.status(200)
        response.json(info)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Not found"})
    }
})
/*
http://localhost:8080/v1/lion-school/cursos

http://localhost:8080/v1/lion-school/alunos

http://localhost:8080/v1/lion-school/alunos/20151001001

http://localhost:8080/v1/lion-school/alunos/cursos/DS

http://localhost:8080/v1/lion-school/alunos/filtro?status1=Finalizado

http://localhost:8080/v1/lion-school/alunos/filtro?curso=DS&status2=Aprovado

http://localhost:8080/v1/lion-school/alunos/filtro?curso=DS&ano=2022
*/

app.listen('8080', function(){
    console.log('API aguardando requisição ...')
})
