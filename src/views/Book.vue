<template>
  <v-container>
    <v-row no-gutters class="mx-10">
      <v-col sm="10" class="px-11 pt-10 mx-auto ">
        <v-card class="pa-2">
          <img class="image" :src="book.imgUrl" />
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">
                  {{ book.category }}
                </v-btn>
              </v-col>
              <v-col sm="10" class="d-flex justify-end">
                <v-btn
                  color="success"
                  text
                  :to="{ name: 'EditBook', params: { id: book.id } }"
                >
                  <v-icon left>mdi-notebook-edit-outline</v-icon>
                  Edit
                </v-btn>
                <v-btn color="error" text @click="deleteBook()"
                  ><v-icon left>mdi-book-remove-outline</v-icon> Delete
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-title class="headline">
            <h3>{{ book.name }}</h3>
          </v-card-title>
          <v-card-text class="grey--text">
            <p>{{ book.description }}</p>
            <p>
              จำนวนคงเหลือ :
              <v-chip dark :class="getColor(book.stockAmount)">
                {{ book.stockAmount }}
              </v-chip>
            </p>
          </v-card-text>
          <v-btn block color="error" x-large @click="back()">
            <v-icon left> mdi-arrow-left</v-icon>
            ย้อนกลับ
          </v-btn>
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
      book: {},
    };
  },
  async created() {
    this.getBookById();
  },
  methods: {
    async getBookById() {
      const id = this.$route.params.id;
      const { data } = await StockService.getBookById(id);
      this.book = data[0];
      console.log(this.book);
    },
    back() {
      this.$router.go(-1);
    },
    getColor(amount) {
      if (amount >= 19) return "green";
      else if (amount > 9) return "orange";
      else {
        return "red";
      }
    },
    async deleteBook() {
      const swal = await this.$swal.fire({
        title: "คุณต้องการจะลบหนังสือนี้ใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      });
      if (swal.isConfirmed) {
        const id = this.$route.params.id;
        const api = await StockService.deleteBookById(id);
        if (api.success) {
          this.$swal.fire("ลบหนังสือสำเร็จ !!", "", "success");
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 800px;
  object-fit: cover;
}
</style>
