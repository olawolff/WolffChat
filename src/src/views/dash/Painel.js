import React, { Component } from 'react';
import { getMessages, message } from "../../redux/worker/lineClient";
import InputCustom from "../InputCustom";
import Load from "./load";
import Header from "./Header";
import {Hidden} from '@material-ui/core';
import Chat from "../chat";
import CustomScroll from 'react-custom-scroll';
import {Avatar} from "../chat/index";
import $ from 'jquery';

let delay = window.chat.bot_delayTime ? window.chat.bot_delayTime : 1000;
let mensagens = [];
let espera = false; // para controle da digitação(wolff digitando) e bloquear input 
let i = -1;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {list:[], message: '', open: true, nomeUser: "", load:true, info:{}, historico: [], filaEspera:[], digitando: false, delay: delay}; // delay default 1000
        this.processarMensagem = this.processarMensagem.bind(this);
    }

    init() {
        getMessages(({activities,watermark}) => {
            let {list} = this.state;
            if (activities&&activities[0]) {
                /*console.log("Mensagens: ");
                console.log(activities);
                console.log("watermark");
                console.log(watermark);*/
                if(watermark && !espera) {
                    var aux = this.state.historico;
                    activities[0].position = "left";
                    aux.push(activities[0]);
                    this.setState({historico:aux, load: false});
                } else if(watermark) {
                    var filaEspera = this.state.filaEspera;
                    var mensagem = activities[0];
                    // calcula o tempo para exibir a mensagem 1 segundo para cada 5 caracteres, e no máximo 5 segundos
                    mensagem.time = this.calculaDelay(mensagem);
                    
                    /*console.log("activities: ");
                    console.log(activities[0]);
                    console.log("tamanho do texto: ");
                    console.log(activities[0].text.length);
                    console.log("tempo de espera");
                    console.log(mensagem.time);*/
                    //filaEspera.push(activities[0]);

                    // seta algumas informações, ex: Placeholder, type, tooltip
                    //this.state.info = mensagem.entities && mensagem.entities[0] ? mensagem.entities[0] : {};
                    filaEspera.push({
                        id: mensagem.id,
                        position: "left",
                        type: "text",
                        text: mensagem.text,
                        entities: mensagem.entities,
                        timestamp: mensagem.timestamp,
                        attachmentLayout: mensagem.attachmentLayout,
                        attachments: mensagem.attachments,
                        time: mensagem.time
                    });
                    if(this.state.info['Nome']) {
                        this.setState({nomeUser: this.state.info['Nome']});
                    }
                }
            }
        })
    }
    // função recursiva para processar a fila de mensagens recebidas
    processarMensagem() {
        /*console.log("lista espera: ");
        console.log(this.state.filaEspera);*/
        //this.orientacao();
        if(i >= 0) {
            var aux = this.state.historico;
            // pega a ultima mensagem do histórico, a mensagem que foi enviada pelo usuário
            // e altera o status para "respondido"
            aux[aux.length-1].status = 'respondido';
            aux.push(this.state.filaEspera[i]);
            // seta algumas informações, ex: Placeholder, type, tooltip
            this.state.info = aux[aux.length-1].entities && aux[aux.length-1].entities[0] ? aux[aux.length-1].entities[0] : {};
            this.setState({historico:aux});
            this.orientacao();
        }
        i++;
        if(i < this.state.filaEspera.length) {
            this.setState({digitando: true});
            this.orientacao();
            //console.log("esperando "+this.state.filaEspera[i].time+" segundos");
            setTimeout(this.processarMensagem, this.state.filaEspera[i].time);
        } else {
            this.setState({digitando: false});
            this.orientacao();
            //console.log("acabou a lista");
            i = -1;
            this.state.filaEspera = [];
            espera = false;
        }
    }

    enviarMensagem(resposta) {
        if((!this.state.message || this.state.message == ' ') && !resposta) { return; };
        var localId = new Date().getTime();
        var mensagem = {
            id: localId,
            position: "right",
            type: 'message',
            text: resposta ? resposta : this.state.message,
            from: { id: 'james' },
            status: 'enviado'
        };
        espera = true;
        var aux = this.state.historico;
        aux.push(mensagem);
        this.setState({historico:aux});
        this.orientacao();
        this.state.message = '';
        message(mensagem, () => {
            var aux = this.state.historico;
            // pega a ultima mensagem do histórico, a mensagem que foi enviada pelo usuário
            // e altera o status para "recebido"
            aux[aux.length-1].status = 'recebido';
            this.setState({historico: aux});
            this.processarMensagem();
        });
    }

    componentDidMount() {
        this.init();
    }
    // função para calcular o tamanho da div do chat e sua barra de rolagem
    altura() {
        setTimeout(function () {
            if($("#chat").height)this.heightScroll=$("#chat").height();
            if($(".custom-scrollbar"))$(".custom-scrollbar").height(this.heightScroll-9);
            if($(".inner-container"))$(".inner-container").height(this.heightScroll);
        }, 19);
    }
    // função para posicionar o foco do chat sempre na última mensagem recebida
    orientacao() {
        setTimeout(function () {
            $('.inner-container').animate({
                scrollTop: $(".inner-container")[0].scrollHeight
            }, 1000);
        }, 30);
    }

    historico() {
        this.altura();
        return (
            <div id="chat" style={{minHeight:0}} className="view conteiner_chat" >
                <CustomScroll flex="1" id="scrollp" >
                    <Chat
                        nomeUser={this.state.nomeUser}
                        list={this.state.historico}
                        digitando={this.state.digitando}
                        enviar={(value)=>this.enviarMensagem(value)}
                    />
                </CustomScroll>
            </div>
        );
    }

    calculaDelay(msg) {
        var delay = 0;
        if(msg.text.length > 0) {
            delay = msg.text.length / 5 * this.state.delay;
        } else if(msg.attachments.length > 0) {
            delay = msg.attachments[0]['content']['text'].length / 5 * this.state.delay;
        } else {
            delay = 1000;
        }

        if(delay > 5000) {
            delay = 5000;
        }
        return delay;
    }

    render() {
        // console.log(this.state.info);
        if(this.state.load)return(<Load/>) ;
        return (
            <div style={{minHeight:0}} className="view content_painel">
                {false&&<Header/>}
                <Hidden smUp >
                    <div className="view content_painel_content4">
                        <div className="view content_painel_view42">
                            {this.historico()}
                        </div>
                        {this.state.digitando&&<Digitando/>}
                        <InputCustom 
                            value={this.state.message}
                            onChange={value => {
                                this.setState({ message: value});
                            }}
                            keyboardType={"default"}
                            enviar={()=>this.enviarMensagem()}
                            disabled={this.state.digitando}
                            info={this.state.info}
                        />
                    </div>
                </Hidden>
                <Hidden mdUp xsDown>
                    <div className="view content_painel_content3" style={{minHeight: 0}}>
                        {this.historico()}
                        {this.state.digitando&&<Digitando/>}
                        <InputCustom
                            value={this.state.message}
                            onChange={value => {
                                this.setState({ message: value});
                            }}
                            keyboardType={"default"}
                            enviar={()=>this.enviarMensagem()}
                            disabled={this.state.digitando}
                            info={this.state.info}
                        />
                    </div>
                </Hidden>
                <Hidden smDown>
                    <div style={{minHeight:0}} className="view content_painel_content2">
                        {this.historico()}
                        {this.state.digitando&&<Digitando/>}
                        <InputCustom
                            value={this.state.message}
                            onChange={value => {
                                this.setState({ message: value});
                            }}
                            keyboardType={"default"}
                            enviar={()=>this.enviarMensagem()}
                            disabled={this.state.digitando}
                            info={this.state.info}
                        />
                    </div>
                </Hidden>
            </div>
        );
    }
}

class Digitando extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let label=window.chat.bot_name+" está digitando..."
        return (
            <div className="view content_index_view4_2">
                <Hidden smUp>
                    <div className="content_index_view7Phone_align_digitando">
                        <div className="content_index_positionDigitado">
                            <Avatar item={{position:"left",digitando:true}} nomeUser=''/>
                        </div>
                    </div>
                    <span style={{fontFamily: 'Montserrat',marginLeft: 5.5,fontSize: 12,fontWeight: 200}}>
                        Está digitando...
                    </span>
                </Hidden>
                <Hidden xsDown>
                    <div className="content_index_view7_align_digitando">
                        <Avatar item={{position:"left",digitando:true}} nomeUser=''/>
                        <span style={{fontFamily: 'Montserrat',marginLeft: 5.5,fontSize: 12,fontWeight: 200}}>
                            Está digitando...
                        </span>
                    </div>
                    <div  className="view content_index_view6"/>
                </Hidden>
            </div>
        );
    }
}