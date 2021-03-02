import React, { Component } from "react";
import Realm from 'realm'


const Utils = {    
    guid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          
        });
    },
    repository(){
         var realm = new Realm({
          schema: [{name: 'users', 
          properties: {
              guid:'string',
              id: 'int',
              namalogin:'string',
              namalengkap:'string', 
              role:'string'         
              }
          }]            
        })  
        return realm
    }    
}

module.exports = Utils