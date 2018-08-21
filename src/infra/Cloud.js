var host = "https://directline.botframework.com/v3/directline";
var token_api = "";
let dados={
  // secret : "32D_cZJFPIk.cwA.d2w.8O9j0alCtLJl3Dbc9mM0gaOdYBo8jAEsBE4HYUCUCzc",
  secret:window.chat.bot_secret,
  token:'',
  conversationId:'',
  streamUrl:''
}


var token_user = "";



module.exports = {
  getHost() {
    return host;
  },
  setInfo(newD) {
    dados={...dados,...newD};
  },
  getToken() {
    return token_api;
  },
  getDados() {
    return dados;
  },
  setTokenUser(token) {
    token_user = token;
  },

  post(metodo, data, retorno,head) {
    var url = host + "/" + metodo;
    // console.log(url);
    var config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...head
      },
      body: JSON.stringify(data)
    };
    // if (token_api) {
    //   config.headers["x-request-id"] = token_api;
    // }
    // if (token_user) {
    //   config.headers["token-user"] = token_user;
    // }
    // console.log(url,config);
    fetch(url, config)
      .then(response => {
        this.resolverResponse(response, retorno);
      })
      .catch(error => {
        if (retorno) retorno(null, error);
      });
  },
  get(metodo, data, retorno) {
    var url = host + "/" + metodo;
    if (data) {
      url += "?";
      var lista = Object.keys(data);
      var contador = 0;
      for (var i = 0; i < lista.length; i++) {
        var item = lista[i];
        if (data[item] + "" == "undefined") continue;
        contador++;
        if (contador != 0) {
          url += "&";
        }
        url += "" + item + "=" + encodeURI(data[item]);
      }
    }
    // console.log(url);
    var config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    if (token_api) {
      config.headers["x-request-id"] = token_api;
    }
    if (token_user) {
      config.headers["token-user"] = token_user;
    }
    fetch(url, config)
      .then(response => {
        this.resolverResponse(response, retorno);
      })
      .catch(error => {
        if (retorno) retorno(null, error);
      });
  },
  put(metodo, data, retorno) {
    var url = host + "/" + metodo;
    // console.log(url);
    var config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    if (token_api) {
      config.headers["x-request-id"] = token_api;
    }
    if (token_user) {
      config.headers["token-user"] = token_user;
    }
    fetch(url, config)
      .then(response => {
        this.resolverResponse(response, retorno);
      })
      .catch(error => {
        if (retorno) retorno(null, error);
      });
  },
  delete(metodo, data, retorno) {
    var url = host + "/" + metodo;
    // console.log(url);
    var config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    if (token_api) {
      config.headers["x-request-id"] = token_api;
    }
    if (token_user) {
      config.headers["token-user"] = token_user;
    }
    fetch(url, config)
      .then(response => {
        this.resolverResponse(response, retorno);
      })
      .catch(error => {
        if (retorno) retorno(null, error);
      });
  },
  resolverResponse(response, retorno) {
    try {
      var p1 = response.json();
      p1.then((responseData, error) => {
        // if (response.status != 200) {
        //   retorno(null, responseData);
        // } else
         if (error) {
          retorno(null, error);
        } else {
          retorno(responseData);
        }
      });
    } catch (e) {
      console.log(e, response.text());
    }
  },

  geoLocalizacao(endereco, retorno) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(endereco) + "&sensor=true&key=AIzaSyAdBVSO_pMhwOzOvCKtvWPpjVRyFJlh4yI";
    // console.log(url);
    this.requestGet(url, json => {
      //   console.log(json);
      if (json && json.results && json.results[0] && json.results[0].geometry) {
        var address = {};
        if (json.results[0].address_components) {
          address.numero = this.getPartLocation("street_number", json);
          address.rua = this.getPartLocation("route", json);
          address.bairro = this.getPartLocation("sublocality", json);
          address.cidade = this.getPartLocation("administrative_area_level_2", json);
          address.estado = this.getPartLocation("administrative_area_level_1", json, true);
          address.pais = this.getPartLocation("country", json, true);
          address.cep = this.getPartLocation("postal_code", json);
        }
        address.endereco = json.results[0].formatted_address;

        var geometry = json.results[0].geometry;
        if (geometry && geometry.location) {
          retorno(geometry.location.lat, geometry.location.lng, address);
        } else {
          retorno(0, 0);
        }
      } else {
        retorno(0, 0);
      }
    });
  },
  requestGet(url, callback) {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        // console.log(response);
        callback(response);
      })
      .catch(error => {
        // console.log(error);
        if (callback) callback(null, error);
      });
  },
  getPartLocation(tag, json, test) {
    var lista = json.results[0].address_components;
    for (var i = 0; i < lista.length; i++) {
      var item = lista[i];
      if (item.types.indexOf(tag) >= 0) {
        if (test) {
          return item.short_name;
        } else {
          return item.long_name;
        }
      }
    }
  }
};
