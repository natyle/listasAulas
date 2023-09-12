import { useState, useEffect, useRef, useMemo, useCallback} from 'react'

//Função principal
export default function App(){

  const inputRef = useRef<HTMLInputElement>(null);
  const primeiraR = useRef(true);
  const [input, setInput] = useState("");
    const [tarefas, setTarefas] = useState<string[]>([])

  const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefa:''
  })
    
  useEffect(()=>{
    const tarefaSalva = localStorage.getItem("@cursoreact")
    if(tarefaSalva) {
      setTarefas(JSON.parse(tarefaSalva));
    }
  }, [])

      useEffect( () => {
      if(primeiraR.current) {
        primeiraR.current=false;
      return;
      }

    localStorage.setItem("@cursoreact",JSON.stringify(tarefas))
    console.log("useEffect chamado!")
    }  ,[tarefas])



      function registrar(){
      if(!input){
        alert("Preencha o nome da sua tarefa")
        return;
      }
      
      if(editarTarefa.enabled){
        editarTarefaSalva();
        return;
      }

      setTarefas(tarefas => [...tarefas, input])
      setInput("")
      localStorage.setItem("@cursorreact" , JSON.stringify([...tarefas, input]))
    }

    function editarTarefaSalva(){
      const findIndexTarefa = tarefas.findIndex(tarefas => tarefas === editarTarefa.tarefa)
      const todasTarefas = [...tarefas];

      todasTarefas[findIndexTarefa]=input;
      setTarefas(todasTarefas);
      setEditarTarefa({
        enabled: false,
        tarefa: ''  
      })
      setInput("")
      localStorage.setItem("@cursoreact" , JSON.stringify(todasTarefas) )
    }
    function excluir(item: string){
      const excluirTarefa = tarefas.filter(tarefas => tarefas !== item)
      setTarefas(excluirTarefa)
      localStorage.setItem("@cursoreact" , JSON.stringify(excluirTarefa))
    }
    function editar(item: string){
      inputRef.current?.focus();
      setInput(item)
      setEditarTarefa({
        enabled:true,
        tarefa: item
      })
    }

   return (
      <div>
        <h1>Lista De Tarefas&#10022;</h1> 
        

        <input
          placeholder="Digite uma tarefa..."
          value={input}
          onChange={ (e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <button onClick={registrar}>{editarTarefa.enabled ? "Atualizar Tarefa" :  "Adicionar Tarefa"}</button>
        <hr/>
        
        <strong>você tem: {tarefas.length}tarefas!</strong>
        {tarefas.map( (item, index) =>(
          <section key={item}>
            <span>{item}</span>
            <button onClick={ () => excluir(item) }>Excluir</button>
            <button onClick={ () => editar(item)}>Editar</button>
          </section>

        ))}
      </div>
  )
}