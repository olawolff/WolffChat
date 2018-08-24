import Cloud from '../../infra/Cloud';



export function startConversation(callback,onErro) {
  if (Cloud.getDados().conversationId !== '') return  onErro("tem conversationId");

  Cloud.post('conversations',{}, (response,erro)=>{
// console.log(response,erro);
  // if(erro)return onErro(erro);
    if(response.streamUrl&&response.conversationId){
      Cloud.setInfo({streamUrl:response.streamUrl,conversationId:response.conversationId});
      callback(response);
    }else {
      callback({})
    }
  },{'Authorization':'Bearer ' + Cloud.getDados().token});
}


export function secretToToken(callback,onErro) {
  // if (Cloud.getDados().secret !== '') return  onErro('tem');

  Cloud.post('tokens/generate',null, (response,erro)=>{
    // console.log(response);
    if(erro)return onErro(erro);
    if(response.token) Cloud.setInfo({token:response.token});
    callback({streamUrl:response.streamUrl,conversationId:response.conversationId});
  },{'Authorization':'Bearer ' + Cloud.getDados().secret});
}



export function message(activity,callback) {
  // console.log(Cloud.getDados());
  // return;
  if (!Cloud.getDados().conversationId ||!activity.text) return  callback?callback({}):null;

  Cloud.post('conversations/' + Cloud.getDados().conversationId + '/activities',activity, (response,erro)=>{
    if(erro)return callback({});
    if(response.token) Cloud.setInfo({token:response.token});
    if(callback)callback(response);
  },{'Authorization':'Bearer ' + Cloud.getDados().token});
}


export function refreshToken(callback,onErro) {
  if (Cloud.getDados().token !== '') return  callback({});

  Cloud.post('tokens/refresh',{}, (response,erro)=>{
    if(erro)return callback({});
    if(response.token) Cloud.setInfo({token:response.token});
    if (callback) callback(response);
  },{'Authorization':'Bearer ' + Cloud.getDados().token});
}


export function getMessages(streamEvent) {
    secretToToken(()=> {
      startConversation(()=> {
        var exampleSocket = new WebSocket(Cloud.getDados().streamUrl);
// console.log(exampleSocket);
        exampleSocket.onerror = (event)=> {
          console.log(event);
        };
        exampleSocket.onclose = (event)=> {
          console.log(event);
        };
        exampleSocket.onopen = (event)=> {
          console.log(event);
        };
        exampleSocket.onmessage = (event)=> {
          // console.log(event);
          if (event.data) {
            //console.log(streamEvent);
            // funcao init do Painel.js
            streamEvent(JSON.parse(event.data));
          }
        };
      },startConversationExeption=> {
        console.log('startConversationExeption:' + JSON.stringify(startConversationExeption));
      });
    },secretToTokenException=> {
      console.log('secretToTokenException:' + JSON.stringify(secretToTokenException));
    });

}
