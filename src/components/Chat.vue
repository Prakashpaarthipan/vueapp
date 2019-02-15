<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>Chat Group</h3>
              <hr/>
          </div>         
          <div class="card-body" id="" v-chat-scroll="{always: false, smooth: true}">              
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
              </div>              
          </div>
          
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="user" class="form-control">
              </div>
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import VueChatScroll from 'vue-chat-scroll';
// var messageBody = document.querySelector('#messageBody');


export default {
    components: { VueChatScroll },
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket : io('172.16.54.155:3001')
        }
    },
        methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = '';            
            
        }
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
            //console.log(this.messages);
            // $('#messageBody').scrollTop($('#messageBody')[0].scrollHeight);
        });
    }

}
</script>
<style>
    .wrapper_div {
        height: 100px;
        overflow-y: auto;
    } 
</style>