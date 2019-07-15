const axios = require("axios")
const deploy = "http://127.0.0.1:3030/blockchain/deploy"
const call = "http://127.0.0.1:3030/blockchain/call"
const getContractAddress = "http://127.0.0.1:3030/blockchain/getContractAddress"
const getE = "http://127.0.0.1:3030/blockchain/getEvents"
const changeProvider = "http://127.0.0.1:3030/protected/changeProvider"


const path = require("path")

//temp location for truffle
const contractModPath = path.resolve(__dirname, "contractMod");


const Web3 = require("web3")
const web3 = new Web3("http://127.0.0.1:8555");

const contractMod = require(contractModPath)(web3)


const addPerson = (person) => {

    return  axios.post(call, {
        contract: "StateLogTestContract",
        id: "StateLogTestContract",
        gas: 50000,
        funcName: "fireEventAdd",
        args: [person]
    })

}

const removePerson = (person) => {
    return  axios.post(call, {
        contract: "StateLogTestContract",
        id: "StateLogTestContract",
        gas: 50000,
        funcName: "fireEventRemove",
        args: [person]
    })

}

const changeProvida = (provider) => {

    return axios.post(changeProvider, {
        newProvider: "ws://127.0.0.1:8556"
    })
}

const testDeploy = () => {

    //get accounts, then get balances
    axios.post(deploy, {
        contract: "StateLogTestContract",
        gas: 500000,
        id: "StateLogTestContract",
    })
    .then(async (res)=>{
        console.log("contract deployed: "+ res.data)
        
        await addPerson("David")
        await addPerson("Sarah")    
        await addPerson("SomeDude")
        await addPerson("Sarah2")
        await addPerson("Jackie")
        await removePerson("David")
        await removePerson("Sarah")
        await removePerson("doesntExist")
        console.log(res.data)
    })
    .catch((err)=>{
    console.log(err)
    })
}
const getAddress = () => {
    
    return axios.post(getContractAddress, {
        Contract: "StateLogTestContract",
        id: "StateLogTestContract",
    })
}

const getEvents = () => {
    
    return axios.post(getE, {
        contract: "StateLogTestContract",
        id: "StateLogTestContract",
        fromBlock: 0,
        toBlock: "latest",
        eventName: "addToLogs",
        gas: 0
    })
}

const testGetState = async () =>{

    /*
    console.log(await addPerson("David").data)
    console.log(await addPerson("Sarah").data)
    console.log(await addPerson("SomeDude").data)
    console.log(await addPerson("Sarah2").data)
    console.log(await addPerson("Jackie").data)
    console.log(await removePerson("David").data)
    console.log(await removePerson("Sarah").data)
    console.log(await removePerson("doesntExist").data)
    */

    const addr = await getAddress()
    console.log(addr.data)

    const events = await getEvents()
    console.log(events.data)
}


//testDeploy()

changeProvida()
.then(console.log)
testGetState()