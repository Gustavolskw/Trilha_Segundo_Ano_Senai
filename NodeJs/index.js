import sh from "superheroes";
import chalk from "chalk";
import moment from "moment";
import fs from "fs";
import { get } from "http";
import clc from "cli-color"
import http from "http";



http.createServer((req, res) => {
    res.write("Priemiro server com Node puro")
    res.end()

}).listen(3000)

console.log("Server Rodando na porta 3000");











/*
var err = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var msg = clc.xterm(202).bgXterm(236);

/*
console.log(msg("Orange on dark gray pipipopo"));

console.log(clc.green("Mensagem verde;"));
console.log(clc.red("Mensagem red;"));
console.log(clc.blue("Mensagem blue;"));
console.log(clc.yellow("Mensagem yellow;"));
console.log(clc.red("red" + clc.blue("blue") + "red"));
console.log(clc.red("red") + " plain" + clc.blue("blue"));
console.log(clc.red.bgWhite.underline("Underlined red text on white background.")); console.log(clc.red("Text in red"));
console.log(err("Error!"));
console.log(warn("Warning"));
console.log(notice("Notice"));
*/



/*
process.stdout.write(
    clc.columns([
        [clc.bold("First Name"), clc.bold("Last Name"), clc.bold("Age")],
        ["John", "Doe", 34],
        ["Martha", "Smith", 20],
        ["Jan", "Kowalski", 30]
    ])
);
















/*
let data = new Date();


let hours = data.getHours();
let mins = data.getMinutes();

let saudacao;
if (hours <= 11) {
    saudacao = "Bom dia!";
} else if (hours <= 17) {
    saudacao = "Boa Tarde !";
} else {
    saudacao = "Boa Noite";
}

const parsedTime = moment(data).format("h:mm:ss");
console.log("Ola " + saudacao);
console.log(`Agora são: ${hours} horas e ${mins} minutos`);


fs.appendFile("OdeioFront.txt", "ola Mundo, isso é NodeJs... cansei de front..", (err) => {
    if (err) throw new err;

    console.log("Arquivo salvo com sucesso!!");
})

fs.rename("OdeioFront.txt", "AmoBack.txt", (err) => {
    if (err) throw new err;
    console.log("Novo Nome Atribuido");
})

*/