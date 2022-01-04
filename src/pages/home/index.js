import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

let itemList = [];



export default function Home({ navigation, route }) {


  const [info, setInfo] = useState(false);
  const [curProduct, setCurProduct] = useState(0);
  const [carrinho, setCarrinho] = useState(false);



  let products = [
    new Product('1', 'Item Perfeito para Notebooks', '150,55', 'Mesa Ventiladora'),
    new Product('2', 'Usado para Colocar na Parede', '289,72', 'Coller de Parede 4cm 20watts'),
    new Product('3', 'Coller Vertical para CPU', '532,80', 'Coller de CPU 12cm 120watts'),
    new Product('4', 'Coller de água, Ideal para ambientes quentes', '64,12', 'Water Coller 2 fans 24cm 60watts'),
    new Product('5', 'Coller de álcool', '331,20', 'Water Coller 3 fans 32cm 30º₢ Max'),

  ];

  function addCarrinho(id) {
    console.log(id);
    itemList.push(id);
    setCurProduct(id);
  }

  const { pessoa } = route.params;
  return (



    <View>

      <View style={{ height: 35, margin: 5, borderRadius: 5, padding: 5, backgroundColor: '#47C', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', color: '#FFF' }}>
          {pessoa}
        </Text>

        <TouchableOpacity onPress={() => setCarrinho(true)}>
          <Text style={{ fontWeight: 'bold', color: '#FFF' }}>
            CARRINHO({itemList.length})
          </Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={false} visible={carrinho}>
        <TouchableOpacity onPress={() => setCarrinho(false)}>
          <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color="#DDD" />
        </TouchableOpacity>
        <View style={{ height: 35, margin: 5, borderRadius: 5, padding: 5, backgroundColor: '#47C', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', color: '#FFF' }}>
            {pessoa}
          </Text>
        </View>
        <View>
          <Text>Itens Comprados:</Text>
          {
            itemList.map((item, i) => {
              return products[item].viewProductItemList();
            })
          }
        </View>
      </Modal>

      <Modal transparent={false} visible={info}>
        {products[curProduct].viewProductModdal(setInfo)}
      </Modal>

      <View style={{ flexDirection: 'row' }}>
        {products.map((p, i) => {
          if (i < 3)
            return p.ViewProductItem(setInfo, addCarrinho, i);
        })}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {products.map((p, i) => {
          if (i > 2)
            return p.ViewProductItem(setInfo, setCurProduct, i);
        })}
      </View>
    </View>
  );
};


class Product {

  constructor(path, desc, price, nome) {
    this.source = path;
    this.description = desc;
    this.preco = price;
    this.nome = nome;
  }

  getImagePath() {
    return require('../../images/' + this.source + '.jpg');
  }

  ViewProductItem(openModdal, setModdal, myID) {
    return (
      <View style={{
        backgroundColor: '#FFF',
        width: 150,
        borderRadius: 10,
        margin: 3,
      }}>
        <View>
          <TouchableOpacity style={{ padding: 3 }} onPress={() => { openModdal(true); setModdal(myID) }}>
            <Image source={this.getImagePath()} style={{ height: 150, width: 150, flexDirection: 'row' }}></Image>

            <Text style={{ fontSize: 12 }}>{this.nome.toUpperCase()}</Text>
            <Text style={{ fontWeight: 'bold' }}>
              <span style={{ fontSize: 11 }}>R$</span>
              <span style={{ fontSize: 18 }}>{this.getPriceDecimal()}</span>
              <span style={{ fontSize: 11 }}>{this.getPriceFraction()}</span>
            </Text>
            <Text>
              <span style={{ fontSize: 11, color: '#AAA' }}>{this.getRandomSold()} Vendidos  </span>
              <span style={{ color: '#FA0' }}>★</span>{this.getRandomStar()}
            </Text>
            <Text style={{ padding: 3, fontSize: 13, color: '#757575' }}>
              {this.getBonus()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /*

<View style={{textAlign: 'right', alignSelf: 'stretch' }}>
              <Text>
                LIKE
              </Text>
              <Text>
                Dislike
              </Text>
            </View>

  */
  viewProductModdal(onClose) {
    return (
      <View>
        <TouchableOpacity onPress={() => onClose(false)}>
          <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color="#DDD" />
        </TouchableOpacity>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
          backgroundColor: '#000'
        }}>
          <Image
            source={this.getImagePath()} style={{ height: 300, alignSelf: 'stretch' }}>
          </Image>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ padding: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>
              <span style={{ fontSize: 12 }}> R$ </span><span style={{ fontSize: 20 }}>{this.preco}</span>
            </Text>
            <Text>
              <span style={{ color: '#FA0' }}>★ </span>{this.getRandomStar()}
              <span style={{ padding: 3, fontSize: 13, color: '#757575' }}>
                {this.getBonus()}
              </span>
            </Text>
          </View>

          <View >
            <Text>
              {this.nome.toUpperCase()}
            </Text>
            <span style={{ padding: 2, fontSize: 13, color: '#666666' }}>{this.getRandomSold()} Vendidos  </span>

          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

        </View>
        <View style={{ padding: 16, }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Descrição</Text>
          <View style={{ padding: 16, borderRadius: 20, height: 200, backgroundColor: "#d4d4d4", }}>
            <Text ba style={{}}>
              {this.description}
            </Text>
          </View>

        </View>
      </View >

    )
  }


  viewProductItemList() {
    console.log('Test' + this.nome);
    return (
      <View>
        <Text>
          {this.nome}
        </Text>
      </View>
    );
  }

  getRandomSold() {
    return Math.floor((Math.random() * 1000))
  }

  getBonus() {
    switch (Math.floor((Math.random() * 6))) {
      case 1:
        return 'Frete Grátis';
      case 2:
        return 'Frete Incluso';
      case 3:
        return 'Usado';
      case 4:
        return 'Devolução Grátis';
      case 5:
        return 'Mais Vendido';
      default:
        return 'Garantia Extendida';
    }

  }

  getRandomStar() {
    return Math.floor((Math.random() * 4)) + 2
  }

  getPriceDecimal() {

    return this.preco.match(/\d+(?=,)/g);;
  }

  getPriceFraction() {
    return this.preco.match(/,\d+/g);
  }

  // 
  //  

}


