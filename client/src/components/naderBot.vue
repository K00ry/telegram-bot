<template>
  <div class="koory-main">
    <div class="form-container">
    <div class="form-line">
        <label for="hears">Hears:</label>
        <input v-model="whatHears" type="text"   id="hears" name="hears_some">
    </div>
    <div class="form-line">
        <label for="says">Says:</label>
        <input v-model="whatSays" type="text" id="says" name="says_some">
    </div>
    <div class="form-line btn">
        <span @click="createConversation" type="submit">Send your message</span>
    </div>
  </div>

<ul class="list-hears">
  <li v-for="(hear,index) in allHears"
       v-bind:key="hear._id"
       v-bind:index="index">
    <span>{{index + 1}}.{{hear.hears}}</span>
    <span v-on:click="deleteConversation(hear._id)" class="x">X</span>
  </li>
</ul>

</div>
</template>

<script>

  import axios from 'axios';
  const url = 'api';

export default {
  name: 'NaderBot',

  data (){
    return{
      whatSays:'',
      whatHears:'',
      allHears:[],
      error:''
    }

  },
  created() {

    axios.get(url)
            .then(res=> this.allHears = res.data.allHears)
            .catch(err => this.error = err);

  },
  methods:{
      createConversation(){
        axios.post(url+'/submit-form',{
          hears_some: this.whatHears,
          says_some:this.whatSays
        }).then(res => console.log(res))
                .catch(err=>console.log(err));
        location.reload()
      },
      deleteConversation(id){
          console.log(id);
        axios.get(url+'/delete',{
            params:{
                id : id
            }
        }).then(res => console.log(res))
                .catch(err=>console.log(err));
        location.reload()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.koory-main{
  display: flex;
  flex-direction: column;
}
.form-container{
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;


}
.form-line{

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: .5em 0;

}

.btn{
  margin :auto;
  width:100%;
  height: 30px;
  background-color: #000000;
  color: #fff;
}

.btn span{

  margin: auto;
}


  .list-hears{
    padding-left: 0;
    margin: 2em auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .list-hears li{

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .x{
    color:red;
    font-size: 2em;

  }

h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
</style>
