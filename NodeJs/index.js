import sh from "superheroes";
import chalk from "chalk";
import moment from "moment";




const time = new Date();

const parsedTime = moment(time).format("h:mm:ss");

console.log(parsedTime);



/*
fs.appendFile("OdeioFront.txt", "ola Mundo, isso é NodeJs... cansei de front..", (err) => {
    if (err) throw new err;

    console.log("Arquivo salvo com sucesso!!");
})

fs.rename("OdeioFront.txt", "AmoBack.txt", (err) => {
    if (err) throw new err;
    console.log("Novo Nome Atribuido");
})*/

