<template>
  <v-app>
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <v-toolbar-title>欢迎{{$store.state.UserName}}</v-toolbar-title>

      <v-spacer></v-spacer>

  
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn icon @click="loginout">
        <v-icon>fa fa-key</v-icon>退出
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>账号生成</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-card class="overflow-hidden" height="220"></v-card>
    <v-divider></v-divider>
    <v-container>
      <v-row justify="center">
        <v-card width="500">
          <v-form>
            <v-select
              :items="productions"
              label="选择套餐"
              solo
              item-text="Name"
              return-object
              v-model="selectproduction"
              @change="getSite"
            ></v-select>
            <v-card-text v-if="sites.length > 0" class="primary">
               <p class="title white--text">  总下载量{{selectproduction.Count}}      
                 每日下载量{{selectproduction.DailyCount}}</p>
                 <v-divider></v-divider>
                 <v-row class="primary">
                 
                <div v-for=" (item,index) in sites" :key="index">
                  <v-btn text color="white">{{item.Name}}</v-btn>
                </div>
                 </v-row>
            </v-card-text>
            <v-menu
              ref="startdate"
              v-model="startdatemenu"
              :close-on-content-click="false"
              :return-value.sync="startdate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startdate"
                  label="开始时间"
                  prepend-icon="fas fa-calendar-day"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startdate" no-title scrollable :min="now">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startdatemenu = false">取消</v-btn>
                <v-btn text color="primary" @click="$refs.startdate.save(startdate)">确定</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="enddate"
              v-model="enddatemenu"
              :close-on-content-click="false"
              :return-value.sync="enddate"
              transition="scale-transition"
              offset-y
              min-width="290px"
              
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="enddate"
                  label="开始时间"
                  prepend-icon="fas fa-calendar-day"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="enddate" no-title scrollable :min="startdate">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startdatemenu = false">取消</v-btn>
                <v-btn text color="primary" @click="$refs.enddate.save(enddate)">确定</v-btn>
              </v-date-picker>
            </v-menu>
            <p>一共{{DateDiff(startdate,enddate)}}天</p>
            <v-btn large color="primary" @click="createAccount">生成账号</v-btn>
          </v-form>
          <v-card-actions class="text-left">
           账号: {{userName}}
           <br>
          密码:{{passWord}}
          </v-card-actions>
          <v-alert type="error" v-if="errorMsg">{{errorMsg}}</v-alert>
        </v-card>
      </v-row>
    </v-container>
    
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          创建账号中....
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import qs from "qs";
import api from "@/plugins/api";
export default {
  data() {
    return {
      selectproduction: { items: {} },
      userName:"",
      now:new Date().toISOString().substr(0, 10),
      passWord:"",
      enddatemenu:false,
      startdatemenu:false,
      loading:false,
      errorMsg:"",
      startdate: new Date().toISOString().substr(0, 10),
      enddate: new Date().toISOString().substr(0, 10),
      sites: [],
      productions: [
        {
          id: 1,
          count: 120,
          name: "产品1",
          items: [
            {
              name: "千图",
              url: "58pic.com"
            },
            {
              name: "千图1",
              url: "58pic.com"
            }
          ]
        }
      ]
    };
  },
  methods: {
     DateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式 
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
    return iDays
    },
    async getProduct() {
      console.log("this.$store.state.token=", this.$store.state.token);
      var res = await api.get("/product/all", {
        token: this.$store.state.token,
        router: this.$router
      });
      if (res.Status) {
        this.productions = res.Data;
     
      }
    },
    async getSite(){


            var res = await api.get("/site/get", {
              params: { ProductID: this.selectproduction.ID },
              token: this.$store.state.token,
              router: this.$router
            });

            if (res.Status) {
              this.sites = res.Data;
            }
          
        
    },
    loginout() {
      this.$store.dispatch("loginout");
      this.$router.replace("/");
    },
    createAccount(){
      if (this.DateDiff(this.startdate,this.enddate) >1 && this.selectproduction.ID > 0){
            api
        .post("/user/create", {
          params: { ProductID: this.selectproduction.ID ,StartAt:this.startdate,EndAt:this.enddate},
          token: this.$store.state.token,
          router: this.$router
        })
        .then(res => {
          this.loading = false;
          if (res.Status) {
            this.errorMsg = null;
            this.userName = res.Data.UserName;
            this.passWord = res.Data.Password;
          }else{
            this.errorMsg = res.Message
          } 

        });
      }else{
        this.errorMsg = "产品必选 天数必须大于1"
      }
    }
  },created(){
    this.getProduct()
  }
};
</script>