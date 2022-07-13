/<template>
  <div class="contianer">
    <!-- 搜索 -->
    <van-search
      class="search"
      v-model="searchval"
      show-action
      placeholder="请输入搜索关键词"
      background="#21b97a"
      @search="onSearch"
    >
      <template #label>
        <div @click="$router.push({ name: 'city' })">
          {{ curCity }} <van-icon name="arrow-down" />
        </div>
      </template>
      <template #action>
        <van-icon name="map-marked" @click="$router.push('/map')" />
      </template>
      <template #left>
        <van-icon name="arrow-left" class="icon" @click="$router.push('/home')" />
      </template>
    </van-search>
    <!-- 导航 -->
    <van-dropdown-menu active-color="#61b9a5" class="menu">
      <van-dropdown-item ref="areashow">
        <div slot="title" :class="{ have: areashow ? true : false }">区域</div>
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="areaConfirm"
          @cancel="areaCancel"
          ref="area"
        />
      </van-dropdown-item>
      <van-dropdown-item title="方式" ref="typeshow">
        <div slot="title" :class="{ have: typeshow ? true : false }">方式</div>
        <van-picker
          show-toolbar
          :columns="typecolumns"
          @cancel="typeCancel"
          @confirm="typeConfirm"
          ref="type"
        />
      </van-dropdown-item>
      <van-dropdown-item ref="priceshow">
        <div slot="title" :class="{ have: priceshow ? true : false }">租金</div>
        <van-picker
          show-toolbar
          :columns="pricecolumns"
          @cancel="priceCancel"
          @confirm="priceConfirm"
          ref="price"
        />
      </van-dropdown-item>
      <van-dropdown-item class="unset" ref="selectshow">
        <div
          slot="title"
          @click="show = true"
          :class="{ have: selectshow ? true : false }"
        >
          筛选
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <HouseShow :handlerlist="houselist"></HouseShow>
    </van-list>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <div>
        <div class="roomType">
          <template>
            <h4>户型</h4>
            <div class="type">
              <span
                v-for="(item, index) in roomType"
                :key="index"
                @click="selectInfo(item.value)"
                :class="{ active: selectInfoList.includes(item.value) }"
                >{{ item.label }}</span
              >
            </div>
          </template>
          <template>
            <h4>朝向</h4>
            <div class="type">
              <span
                v-for="(item, index) in oriented"
                :key="index"
                @click="selectInfo(item.value)"
                :class="{ active: selectInfoList.includes(item.value) }"
                >{{ item.label }}</span
              >
            </div>
          </template>
          <template>
            <h4>楼层</h4>
            <div class="type">
              <span
                v-for="(item, index) in floor"
                :key="index"
                @click="selectInfo(item.value)"
                :class="{ active: selectInfoList.includes(item.value) }"
                >{{ item.label }}</span
              >
            </div>
          </template>
          <template>
            <h4>房屋亮点</h4>
            <div class="type">
              <span
                v-for="(item, index) in characteristic"
                :key="index"
                @click="selectInfo(item.value)"
                :class="{ active: selectInfoList.includes(item.value) }"
                >{{ item.label }}</span
              >
            </div>
          </template>
        </div>
        <div class="btns">
          <button class="cancel" @click="selectcancel">取消</button>
          <button class="confrim" @click="selectconfirm">确定</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getconditionApi, gethouselistApi, getCityApi } from '@/api'
import HouseShow from '@/components/houseShow.vue'
export default {
  name: 'find',
  created () {
    this.getcondition()
    this.gethouselist()
  },
  mounted () {
  },
  data () {
    return {
      searchval: '',
      selectshow: false,
      priceshow: false,
      typeshow: false,
      areashow: false,
      show: false,
      getconditions: {},
      columns: [
        {
          text: '区域',
          children: [
          ]
        },
        {
          text: '地铁',
          children: [
          ]
        }
      ],
      typecolumns: [],
      pricecolumns: [],
      floor: [],
      roomType: [],
      characteristic: [],
      oriented: [],
      obj: {
        start: 1,
        end: 20
        //  cityId, area, subway, rentType, oriented, characteristic, floor, start, end
      },
      houselist: [],
      loading: false,
      finished: false,
      selectInfoList: []
    }
  },
  methods: {
    onSearch () { },
    onLoad () {
      this.obj.start = this.obj.start + 20
      this.obj.end = this.obj.end + 20
      this.gethouselist()
    },
    async areaConfirm () {
      this.areashow = true
      // console.log(this.$refs.area.getValues())
      const values = this.$refs.area.getValues()
      this.$refs.areashow.toggle()
      this.subway = null
      this.obj.start = 1
      this.obj.end = 20
      this.houselist = []
      if (values[0].text === '区域') {
        if (values[2].text === '不限') {
          // 只有二级城市时
          const res = await getCityApi(2)
          const citylist = res.data.body
          const index = citylist.findIndex(item => {
            return item.label === values[1].text
          })
          console.log(index)
          this.obj.area = citylist[index].value
          this.gethouselist()
        } else if (values[1].text === '不限') {
          this.gethouselist()
        } else {
          // 三级城市
          const res = await getCityApi(3)
          const citylist = res.data.body
          const index = citylist.findIndex(item => {
            return item.label === values[2].text
          })
          console.log(index)
          this.obj.area = citylist[index].value
          this.gethouselist()
        }
      } else {
        this.obj.area = null
        this.obj.subway = values[1].text
        this.gethouselist()
      }
    },
    areaCancel () {
      this.$refs.areashow.toggle()
    },
    typeConfirm () {
      this.typeshow = true
      const values = this.$refs.type.getValues()
      this.$refs.typeshow.toggle()
      this.obj.start = 1
      this.obj.end = 20
      this.houselist = []
      if (values[0] === '不限') {
        this.gethouselist()
      } else if (values[0] === '整租') {
        this.obj.rentType = true
        this.gethouselist()
      } else {
        this.obj.rentType = false
        this.gethouselist()
      }
    },
    typeCancel () {
      this.$refs.typeshow.toggle()
    },
    priceConfirm () {
      this.priceshow = true
      const index = this.$refs.price.getIndexes()
      this.$refs.priceshow.toggle()
      this.obj.start = 1
      this.obj.end = 20
      this.houselist = []
      this.obj.price = this.getconditions.price[index].value
      this.gethouselist()
    },
    priceCancel () {
      this.$refs.priceshow.toggle()
    },
    selectconfirm () {
      this.selectshow = true
      this.$refs.priceshow.toggle()
      this.show = false
      this.obj.start = 1
      this.obj.end = 20
      this.houselist = []
      this.obj.more = this.selectInfoList.join(',')
      this.gethouselist()
    },
    selectcancel () {
      this.$refs.selectshow.toggle()
    },
    selectInfo (Info) {
      console.log(Info)
      this.selectInfoList.push(Info)
    },
    async getcondition () {
      try {
        const res = await getconditionApi(this.cityInfo.value)
        this.getconditions = res.data.body
        console.log(res)
        console.log(this.getconditions)
        const { area, subway, rentType, price, floor, oriented, characteristic, roomType } = res.data.body
        // 地域第二级
        area.children.forEach((item, index) => {
          this.columns[0].children.push({ text: item.label, children: [] })
          // 第三级
          if (item.children === undefined) {
            this.columns[0].children[index].children.push({ text: '' })
          } else {
            item.children.forEach((item1) => {
              this.columns[0].children[index].children.push({ text: item1.label })
            })
          }
        })
        // 地铁
        subway.children.forEach((item, index) => {
          this.columns[1].children.push({ text: item.label, children: [] })
          // 第三级
          // item.children && item.children.forEach((item1) => {
          //   this.columns[1].children[index].children.push({ text: item1.label })
          // })
          if (item.children === undefined) {
            this.columns[1].children[index].children.push({ text: '' })
          } else {
            item.children.forEach((item1) => {
              this.columns[1].children[index].children.push({ text: item1.label })
            })
          }
        })
        // type处理
        rentType.forEach(item => {
          this.typecolumns.push(item.label)
        })
        // price处理
        price.forEach(item => {
          this.pricecolumns.push(item.label)
        })
        this.floor = floor
        this.roomType = roomType
        this.characteristic = characteristic
        this.oriented = oriented
      } catch (err) {
        console.log(err)
      }
    },
    async gethouselist () {
      try {
        console.log(123)
        this.obj.cityId = this.cityInfo.value
        const res = await gethouselistApi(this.obj)
        this.houselist.push(...res.data.body.list)
        console.log(res)
        this.loading = false
        if (res.data.body.list.length === 0) {
          this.finished = true
          this.loading = false
        }
      } catch (err) {
        console.log(err)
        this.$toast('数据获取失败')
      }
    }
  },
  computed: {
    ...mapState(['curCity', 'cityInfo'])
  },
  watch: {},
  filters: {},
  components: {
    HouseShow
  }
}
</script>

<style scoped lang='less'>
/deep/.van-search__action {
  color: #fff;
  font-size: 22px;
  margin-right: 8px;
}
/deep/.van-search__label {
  margin-right: 10px;
}
/deep/.van-field__left-icon {
  border-left: 1px solid #e5e5e5;
  padding-left: 10px;
}
/deep/.van-search__content {
  background-color: #fff;
  padding-left: unset;
}
.icon {
  font-size: 20px;
  color: #fff;
  margin-right: 16px;
}
.select {
  height: 100vh;
}
/deep/.unset {
  .van-dropdown-item--down {
    top: unset !important;
  }
}
.roomType {
  padding: 0 14px;
  h4 {
    font-size: 15px;
    font-weight: normal;
    color: #333;
    margin: 20px 0;
  }
  .type {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    margin: 0 60px 10px 40px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 32px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      font-size: 12px;
      margin-bottom: 15px;
      color: #888888;
    }
  }
}
.menu {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}
.main {
  padding: unset;
}
.contianer {
  padding-bottom: 50px;
}
/deep/.van-picker__toolbar {
  .van-picker__confirm {
    width: 60%;
    padding: unset;
    background-color: #21b97a;
    color: #ffffff;
    border-bottom: 1px solid #e9e9e9;
  }
  .van-picker__cancel {
    width: 40%;
    padding: unset;
    color: #21b97a;
    border-bottom: 1px solid #e9e9e9;
  }
}
.btns {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  .confrim {
    height: 44px;
    width: 60%;
    background-color: #21b97a;
    color: #ffffff;
    border: 0;
    font-size: 14px;
    border-top: 1px solid #e9e9e9;
  }
  .cancel {
    height: 44px;
    width: 40%;
    color: #21b97a;
    border: 0;
    font-size: 14px;
    background-color: #ffffff;
    border-top: 1px solid #e9e9e9;
  }
}
.active {
  border: 1px solid #21b97a !important;
  background-color: #defaef;
  color: #21b97a !important;
}
.have {
  color: #21b97a !important;
}
</style>
