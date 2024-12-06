const DadosAlunos = require('./alunos')
const DadosCursos = require('./cursos')
const listaAlunos = DadosAlunos.alunos
const listaCursos = DadosCursos.cursos

 
const obterCursos  = () => {
    let resultado = { "cursos": listaCursos }

    if (listaAlunos.length > 0) {
        return resultado
    } else {
        return false
    }
}

const obterAlunos  = () => {
    let resultado = { "alunos": listaAlunos }

    if (listaAlunos.length > 0) {
        return resultado
    } else {
        return false
    }
}

const localizarAluno = (matricula) => {
    let eCtDmatricula = String(matricula.toUpperCase())
    let alunoEncontrado = false

    listaAlunos.forEach(function(alunoAtual) {
        if (String(alunoAtual.matricula.toUpperCase()) === eCtDmatricula) {
            alunoEncontrado = alunoAtual
        }
    })

    return alunoEncontrado
}
//console.log(localizarAluno('2015100101'))

const alunosPorCurso = (siglaCurso) => {
    let resultado = { curso: siglaCurso, alunos: [] }

    listaAlunos.forEach(function(alunoAtual) {
        alunoAtual.curso.forEach(function(cursoDoAluno) {
            if (cursoDoAluno.sigla === siglaCurso) {
                resultado.alunos.push(alunoAtual)
            }else{
                if(resultado.alunos.length < 0){
                    resultado = false
                }
            }
        })
    })

    return resultado
}

const filtrarPorStatus = (status) => {
    let resultado = { status: status, alunos: [] }

    listaAlunos.forEach(function(alunoAtual) {
        if (alunoAtual.status === status) {
            resultado.alunos.push(alunoAtual)
        }else{
            if(resultado.alunos.length < 0){
                resultado = false
            }
        }
    })

    return resultado
}

const cursoEStatus  = (siglaCurso, status) => {
    let resultado = { curso: siglaCurso, status: status, alunos: [] }

    listaAlunos.forEach(function(alunoAtual) {
        let disciplinasFiltradas = []

        alunoAtual.curso.forEach(function(cursoDoAluno) {
            if (cursoDoAluno.sigla === siglaCurso) {
                cursoDoAluno.disciplinas.forEach(function(disciplina) {
                    if (disciplina.status === status) {
                        disciplinasFiltradas.push(disciplina)
                    }
                })

                cursoDoAluno.disciplinas = disciplinasFiltradas
                alunoAtual.curso = cursoDoAluno
                resultado.alunos.push(alunoAtual)
            }else{
                if(resultado.alunos.length < 0){
                    resultado = false
                }
                
            }
        })
    })

    return resultado
}

//console.log(cursoEStatus('ds' , 'Aprovado'))


const filtrarPorAnoConclusao = (siglaCurso, anoConclusao) => {
    let resultado = { curso: siglaCurso, anoConclusao: anoConclusao, alunos: [] }

    listaAlunos.forEach(function(alunoAtual) {
        alunoAtual.curso.forEach(function(cursoDoAluno) {
            if (cursoDoAluno.sigla === siglaCurso && cursoDoAluno.conclusao === anoConclusao) {
                resultado.alunos.push(alunoAtual)
            }
            else{
                if(resultado.alunos.length < 0){
                    resultado = false
                }
            }
        })
    })

    return resultado
}

const aplicarFiltros = (status, curso, statusAluno, anoConclusao) => {
    let resultado = false;

    if (status) {
        resultado = filtrarPorStatus(status)
    } else if (curso && statusAluno && !anoConclusao) {
        resultado = cursoEStatus (curso, statusAluno)
    } else if (curso && anoConclusao && !statusAluno) {
        resultado = filtrarPorAnoConclusao (curso, anoConclusao)
    }

    return resultado
}
// console.log(filtrarPorAnoConclusao('DS', '2022'))
// console.log(aplicarFiltros('','DS','', '2022'))

module.exports = {
    obterCursos ,
    obterAlunos,
    localizarAluno,
    alunosPorCurso,
    aplicarFiltros
}
