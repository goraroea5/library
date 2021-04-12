<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>เพิ่มหนังสือใหม่</v-card-title>

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
                mdi-book-plus-outline
              </v-icon>
              เพิ่มหนังสือใหม่
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
      form: {
        name: "",
        category: "",
        imgUrl: "",
        description: "",
        stockAmount: 0,
        price: 0,
      },
    };
  },
  methods: {
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        const payload = this.form;
        const { success } = await StockService.addBook(payload);
        if (success) {
          this.$swal("เพิ่มหนังสือสำเร็จ", "", "success");
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.$router.push(`/`);
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
