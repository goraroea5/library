<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>แก้ไขหนังสือ</v-card-title>

          <v-form ref="form" class="pa-5">
            <v-text-field
              label="ชื่อหนังสือ"
              outlined
              prepend-icon="mdi-notebook-outline"
              :rules="rules"
              v-model="form.name"
            />
            <v-text-field
              label="ประเภทหนังสือ"
              outlined
              prepend-icon="mdi-bookmark-multiple-outline"
              :rules="rules"
              v-model="form.category"
            />
            <v-textarea
              label="รายละเอียด"
              prepend-icon="mdi-comment-bookmark-outline"
              outlined
              :rules="rules"
              v-model="form.description"
            ></v-textarea>
            <v-text-field
              label="URL รูปภาพ"
              :rules="rules"
              outlined
              prepend-icon="mdi-file-image-outline"
              v-model="form.imgUrl"
            >
            </v-text-field>
            <v-row>
              <v-col class="6">
                <v-text-field
                  label="จำนวน"
                  :rules="rules"
                  outlined
                  prepend-icon="mdi-storefront-outline"
                  type="number"
                  v-model.number="form.stockAmount"
                >
                </v-text-field>
              </v-col>
              <v-col class="6">
                <v-text-field
                  label="ราคา"
                  :rules="rules"
                  outlined
                  prepend-icon="mdi-currency-usd"
                  type="number"
                  v-model.number="form.price"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-btn
              color="success"
              block
              x-large
              class="mt-3"
              @click="handleSubmit"
            >
              <v-icon left>
                mdi-book-check-outline
              </v-icon>
              แก้ไขหนังสือ
            </v-btn>
            <v-btn
              color="error"
              @click="back()"
              block
              x-large
              class="mt-3 px-6"
            >
              <v-icon left> mdi-arrow-left</v-icon>
              ย้อนกลับ
            </v-btn>
          </v-form>
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
      rules: [(value) => !!value || "กรุณากรอกข้อมูลให้ครบถ้วน"],
      form: {},
    };
  },
  created() {
    this.getBookById();
  },
  methods: {
    async getBookById() {
      const id = this.$route.params.id;
      const { data } = await StockService.getBookById(id);
      this.form = data[0];
      console.log("id", id);
    },
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        const id = this.$route.params.id;
        const payload = {
          name: this.form.name,
          description: this.form.description,
          imgUrl: this.form.imgUrl,
          stockAmount: this.form.stockAmount,
          price: this.form.price,
          category: this.form.category,
        };
        const { isConfirmed } = await this.$swal.fire({
          title: "คุณต้องการจะแก้ไขหนังสือเล่มนี้ใช่หรือไม่ ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ยกเลิก",
        });
        if (isConfirmed) {
          const { success } = await StockService.editBookById(id, payload);
          if (success) {
            this.$swal("แก้ไขหนังสือเรียบร้อย", "", "success");
            this.back();
          }
        }
      }
    },
    back() {
      this.$router.go(-1);
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
