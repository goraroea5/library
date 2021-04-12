<template>
  <v-container>
    <v-row no-gutters align="center">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          color="deep-orange darken-2"
          dark
          large
          :to="{ path: '/addbook' }"
        >
          <v-icon left>
            mdi-book-plus-outline
          </v-icon>
          เพิ่มหนังสือใหม่
        </v-btn>
      </v-col>
      <v-col cols="3" class="pa-2" v-for="book in books" :key="book.id">
        <v-card
          hover
          class="pa-1"
          :to="{ name: 'Book', params: { id: book.id } }"
        >
          <v-img
            :src="book.imgUrl"
            max-height="300"
            class="image"
            width="100%"
            alt=""
          />
          <v-btn
            class="ml-4 mt-3"
            readonly
            @click="(e) => e.preventDefault()"
            small
            outlined
            color="indigo"
          >
            {{ book.category }}
          </v-btn>
          <v-card-title class="headline">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <h4 v-bind="attrs" v-on="on" class="ellipsis">
                  {{ book.name }}
                </h4>
              </template>
              <span>{{ book.name }}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-chip outlined color="success"> ฿ {{ book.price }} </v-chip>
          </v-card-title>
          <v-card-text class="py-0">
            <div class="des">
              <p>{{ eclipse(book.description) }}</p>
            </div>
            <p>
              จำนวนคงเหลือ :
              <v-chip dark :class="getColor(book.stockAmount)">
                {{ book.stockAmount }}
              </v-chip>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StockProvider from "@/resources/stockProvider";

const StockService = new StockProvider();
export default {
  data() {
    return {
      books: [],
    };
  },
  async created() {
    await this.getAllBook();
  },
  methods: {
    async getAllBook() {
      const { data } = await StockService.getAllBook();
      this.books = data;
      console.log("books", this.books);
    },
    getColor(amount) {
      if (amount >= 19) return "green";
      else if (amount > 9) return "orange";
      else {
        return "red";
      }
    },
    eclipse(string) {
      const count = string.length;
      if (count < 50) {
        return string;
      }
      if (count >= 50) {
        return string.substring(0, 49) + "....";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  object-fit: cover;
  height: 300px;
}
.des {
  height: 100px;
}
.ellipsis {
  width: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
