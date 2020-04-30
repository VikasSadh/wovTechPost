import React, { Component } from 'react';
import { 
  Text, 
  View,
  FlatList, 
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { styles } from './style'
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      modalVisible: false,
      loading: true,
      listData: [],
      filteredData: []
    }
  }
  componentDidMount = ()=>{
    const { page } = this.state;
    if(page == 0){
      this.timer = setInterval(()=> this.getData(page), 1000)
    }else{
      this.timer = setInterval(()=> this.getData(page + 1), 1000)
    }
   
  }

  getData = (page) =>{
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }     
  }) 
  .then((response) => response.json())
  .then((responseJSON) => {
    debugger
    const { listData, filteredData } = this.state;
    responseJSON.hits.forEach(element => {
      listData.push(element)
      filteredData.push(element)
    });
    this.setState({
      listData: listData,
      filteredData: filteredData,
      page: responseJSON.page,
      loadMore: responseJSON.page < responseJSON.nbPages,
      loading: false,
      isRefreshing: false
    })
  })
  }

  searchPosts = () =>{
    const { search, listData, filteredData } = this.state;
    const searchText = search.trim().toLowerCase()
    const newArr = listData.filter(obj =>  {
      if(obj.url){
        if(obj.url.includes(searchText)){
          return obj
        }
      }
      if(obj.author){
        if(obj.author.includes(searchText)){
          return obj
        }
      }
       
    });
    this.setState({
      listData: filteredData,
      filteredData: newArr,
      loadMore: false
    })
  }

  onRefresh = () =>{
    this.setState({
      isRefreshing: true,
      listData: [],
      filteredData: [],
      search: ''
    }, ()=> this.getData(0));
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: '100%',
          backgroundColor: 'transparent'
        }}
      />
    );
  };

  renderFooter = () => {
     if (!this.state.loading) return null;
     return (
       <ActivityIndicator
         style={{ color: '#000' }}
       />
     );
   };

  handleLoadMore = () => {
    if (!this.state.loading && this.state.loadMore) {
      const { page } = this.state;
      this.getData(page + 1); 
    }
  };

  shortByTitle = () =>{
    const { filteredData } = this.state;
    filteredData.sort(function(a, b){
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
    })
    this.setState({
      filteredData: filteredData,
      modalVisible: false
    })
  }

  shortByCretaedAt = () =>{
    const { filteredData } = this.state;
    filteredData.sort(function(a, b){
      if(a.created_at < b.created_at) { return -1; }
      if(a.created_at > b.created_at) { return 1; }
      return 0;
    })
    this.setState({
      filteredData: filteredData,
      modalVisible: false
    })
  }

  shortReset = () =>{
    this.setState({
      filteredData: this.state.listData,
      modalVisible: false
    })
  }

  render() {
    const { listData, page, loadMore, search, modalVisible, filteredData } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View>
          <Text style={styles.title}>
            Posts
          </Text>
        </View>
        <View style={styles.searchView}>
          <TextInput
            onChangeText={(text)=> this.setState({search: text})}
            value={search}
            placeholder='Search by Url or Author'
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={()=> this.searchPosts()}
            style={styles.searchButton}
          >
            <Text style={styles.searchText}>
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.refreshView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> this.onRefresh()}
            style={styles.refreshButton}
          >
            <Text style={styles.refreshText}>
              REFRESH
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredData}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
          renderItem={({ item }) => 
          { 
            return(
              <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.card}
                onPress={()=> Actions.JsonPage({text: item})}
              >
                <View style={styles.singleRow}>
                  <Text style={styles.cardTitles}>
                    Title:
                  </Text>
                  <Text style={styles.cardValues}>
                    {item.title}
                  </Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.cardTitles}>
                    URL:
                  </Text>
                  <Text style={styles.cardValues}>
                    {item.url}
                  </Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.cardTitles}>
                    Created At:
                  </Text>
                  <Text style={styles.cardValues}>
                    {item.created_at}
                  </Text>
                </View>
                <View style={styles.singleRow}>
                  <Text style={styles.cardTitles}>
                    Author:
                  </Text>
                  <Text style={styles.cardValues}>
                    {item.author}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }
        }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.4}
          onEndReached={()=> this.handleLoadMore()}
        />

        <Modal
          animationType="slide"
          isVisible={modalVisible}
          backdropColor='#000'
          backdropOpacity={0.3}
          onBackButtonPress={()=> this.setState({modalVisible: false})}
          onBackdropPress={()=> this.setState({modalVisible: false})}
        >
          <View style={styles.modalView}>
            <View style={styles.modalView}>
              <View style={styles.filterTitleView}>
                <Text style={styles.modalText}>Select filter to apply</Text>  
              </View>     
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.commonTouch}
                onPress={()=> this.shortByTitle()}
              >
                <Text style={styles.textStyle}>Filter by title</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.commonTouch}
                onPress={()=> this.shortByCretaedAt()}
              >
                <Text style={styles.textStyle}>Filter by created at</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.commonTouch}
                onPress={()=> this.shortReset()}
              >
                <Text style={styles.textStyle}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.filterView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.filterButton}
            onPress={()=> this.setState({modalVisible: true})}
          >
            <Image
              source={require('../../assets/images/filter.png')}
              style={styles.filterImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}