import VMasker from "vanilla-masker";


export function parseCnae(value) {
  var str = value; //"63.11-9-00";
  if (value) {
    str = str.replace("-", "")
    str = str.replace("-", "")
    str = str.replace(".", "")
    var res = str.substring(0, str.length - 2);
    return parseInt(res)
  } else {
    return value;
  }

}


export function isEmail(email) {
  var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;
  if (!er.exec(email)) {
    return false;
  } else {
    return true;
  }
}
export function limparStringNumber(value) {
  if (value) {
    return value.replace(/[^\d]+/g, "");
  } else {
    return "";
  }
}

export function maskFormate(value, mask, limit, font) {
  if (!value) return '';
  if (mask == "money") {
    value = VMasker.toMoney(value);
    value = replaceAll(value, ".", "");
    value = replaceAll(value, ",", ".");
    value='R$ '+value;
  } else if (mask == "int") {
    value = VMasker.toNumber(value);
  } else if (mask == "doub") {
    if (!value) {
      value = 0;
    } else {
      value = parseFloat(value);
    }
  } else if (mask == "phone") {
    // console.log(value.length);
    var telMask = ["(99) 9999-9999", "(99) 99999-9999", "9999 999 9999"];
    if (contemString(limparStringNumber(value), "0800")) {
      value = VMasker.toPattern(value, telMask[2]);
    } else {
      value = VMasker.toPattern(value, telMask[(limparStringNumber(value).length<11?0:1)]);
    }
    // console.log(contemString(limparStringNumber(value),"0800"),value,limparStringNumber(value));
  } else if (mask) {
    value = VMasker.toPattern(value, mask);
  }
  if (limit && value.length > limit) {
    value = value.substring(0, limit);
  }
  if (font == 1) {
    value = value.toUpperCase();
  } else if (font == 2) {
    value = value.toLowerCase();
  }
  return value;
}
export function isPhone(t) {
  var RegExp = /\(\d{2}\)\s\d{4,5}-?\d{4,5}/g;
  if (RegExp.test(t)) {
    return true;
  } else {
    return false;
  }
}
export function contemString(string, key) {
  if (!string || !key) {
    return false;
  }
  try {
    string = string + "";
    if (string && string.indexOf(key) >= 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}
export function startsWith(string, key) {
  if (string) {
    string = string + "";
  } else {
    return false;
  }
  if (string && string.indexOf(key) === 0) {
    return true;
  } else {
    return false;
  }
}
export function endWith(string, key) {
  if (string) {
    string = string + "";
  } else {
    return false;
  }
  if (string && string.indexOf(key, string.length - key.length) === 0) {
    return true;
  } else {
    return false;
  }
}


export function parseMoney(value) {
  value = parseNumeroDuasCasas(value);
  if (!value) {
    return "R$ 0,00";
  }
  value = value + "";
  return "R$ " + value.replace(".", ",");
}

export function replaceAll(string, str, key) {
  try {
    if (!string) {
      return "";
    }
    if (!str) {
      return string;
    }
    if (!key) {
      key = "";
    }
    return string.replace(new RegExp(str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), key);
  } catch (e) {
    return string;
  }
}

export function parseNumeroDuasCasas(string) {
  if (!string) {
    return 0.0;
  }
  try {
    string = string + "";
    var val = string.replace(",", ".");
    var nnn = parseFloat(val);
    if (!nnn) {
      nnn = 0.0;
    }
    var num = nnn.toFixed(2);
    if (!num || num < 0) {
      num = 0.0;
    }
    return num;
  } catch (e) {
    console.log(e);
    return 0.0;
  }
}

export function openEmail(email, subject, body) {
  var link = encodeURI(
    "mailto:" +
    email +
    (subject ? "&subject=" + subject : "") +
    (body ? "&body=" + body : "")
  );
  web(link);
}
export function call(phoneNumber) {
  var link = phoneNumber ? "telprompt:" : "tel:";
  link += phoneNumber;
  web(link)
}

export function openMap(data) {
  openRoute(data);
}

export function openRoute(data) {
  var latitude = data.latitude;
  var longitude = data.longitude;
  web("http://maps.google.com/?q="+latitude+","+longitude)
}
export function web(url) {
  if (!(url.indexOf("http") >= 0) && !(url.indexOf("mailto") >= 0)) {
    url = "http://" + url;
  }
  var win = window.open(url, "_blankFromWebApp");
  if (!(url.indexOf("mailto") >= 0)) {
    win.focus();
  }
}

export function getPartLocation(tag, json) {
  var lista = json.results[0].address_components;
  for (var i = 0; i < lista.length; i++) {
    var item = lista[i];
    if (item.types.indexOf(tag) >= 0) {
      return item.long_name;
    }
  }
}
export function geoLocalizacao(endereco, retorno) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(endereco) + "&sensor=true&key=AIzaSyAdBVSO_pMhwOzOvCKtvWPpjVRyFJlh4yI";
  console.log(url);
  getRequest(url, json => {
    if (json.results && json.results[0] && json.results[0].geometry) {
      var address = {};
      if (json.results[0].address_components) {
        address.numero = getPartLocation("street_number", json);
        address.rua = getPartLocation("route", json);
        address.bairro = getPartLocation("sublocality", json);
        address.cidade = getPartLocation("administrative_area_level_2", json);
        address.estado = getPartLocation("administrative_area_level_1", json);
        address.pais = getPartLocation("country", json);
        address.cep = getPartLocation("postal_code", json);
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
}
export function getRequest(url, retorno, backErro) {
  // fetch('/package.json').then(function(response) {
  //   return response.json()
  // }).then(function(json) {
  //   console.log('parsed json', json)
  // }).catch(function(ex) {
  //   console.log('parsing failed', ex)
  // })
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // console.log('parsed json', json)
      retorno(json);
    })
    .catch(function(error) {
      if (backErro) {
        backErro(error);
      }
    });
}



export function cleanString(s) {
  if (!s) {
    return "";
  }
  var r = s; //.toLowerCase();
  r = r.replace(new RegExp(/\s/g), "");
  r = r.replace(new RegExp(/[àáâãäå]/g), "a");
  r = r.replace(new RegExp(/æ/g), "ae");
  r = r.replace(new RegExp(/ç/g), "c");
  r = r.replace(new RegExp(/[èéêë]/g), "e");
  r = r.replace(new RegExp(/[ìíîï]/g), "i");
  r = r.replace(new RegExp(/ñ/g), "n");
  r = r.replace(new RegExp(/[òóôõö]/g), "o");
  r = r.replace(new RegExp(/œ/g), "oe");
  r = r.replace(new RegExp(/[ùúûü]/g), "u");
  r = r.replace(new RegExp(/[ýÿ]/g), "y");
  r = r.replace(new RegExp(/\W/g), "");
  return r;
}
export function distance(data, state) {
  return this.getDistance(data, state.user_local);
}
export function getDistance(origin, destino) {
  if (!origin || !destino) {
    return "";
  }
  var foco = origin;
  var user_local = destino;
  if (user_local && user_local.latitude && foco.longitude && foco.longitude) {
    var latitude = user_local.latitude;
    var longitude = user_local.longitude;
    var mts = distLatLongEmMt(
      latitude,
      longitude,
      foco.latitude,
      foco.longitude
    );
    return humanizarDistancia(mts);
  } else {
    return "";
  }
}
export function distLatLongEmMt(lat1, lon1, lat2, lon2) {
  lat1 = Number(lat1);
  lon1 = Number(lon1);
  lat2 = Number(lat2);
  lon2 = Number(lon2);

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var R = 6371; // Radius of the earth in kilometers
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in KM
  return d * 1000;
}
export function humanizarDistancia(metros) {
  if (metros < 50) {
    return "Poucos metros";
  } else if (metros < 1000) {
    return parseInt(metros + "") + " m";
  } else {
    return parseInt(metros / 1000 + "") + " km";
  }
}
