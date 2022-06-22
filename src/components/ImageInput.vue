<script setup lang="ts">
import qs from 'qs'
import { useWineStore } from '~/store/wine'

const wine = useWineStore()

const fileList = ref([])
const imageBase64 = ref('')
const isLoading = ref(false)
const isFinsh = ref(false)

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  imageBase64.value = file.content
}

const submit = async () => {
  isFinsh.value = true
  const image = encodeURI(imageBase64.value.replace(/^data:image\/\w+;base64,/, ''))
  const access_token = import.meta.env.VITE_ACCESS_TOKEN
  const url = `/api/redwine?access_token=${access_token}`
  isLoading.value = true
  const { data: res } = await useFetch(url, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      return {
        options,
      }
    },
  }).post(qs.stringify({ image })).json()
  isLoading.value = false
  if (res.value.result)
    wine.data = res.value.result

  // eslint-disable-next-line no-console
  console.log(res.value)
}

const reset = () => [
  imageBase64.value = '',
  fileList.value = [],
  wine.data = {},
  isFinsh.value = false,
]
</script>

<template>
  <div m-t-10>
    <em text-sm op75>选取一张照片或拍照</em>
  </div>
  <van-uploader v-model="fileList" preview-size="10rem" m-y-10 accept=".jpg,.png,.bmp" :after-read="afterRead" :deletable="false">
    <div v-if="imageBase64 === ''" h-40 w-40 m-y-10 m-x-auto flex justify-center items-center bg-teal-700 rounded-full cursor-pointer hover:bg-teal-600 after:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50>
      <div i-mdi-camera text-4xl inline-block />
    </div>
  </van-uploader><br>
  <div v-if="isFinsh" m-b-4>
    <div font-bold>
      品名:
      <p text-red-100>
        {{ isLoading ? '识别中...' : (wine?.data.wineNameCn === '' || !wine?.data.wineNameCn) ? '这个我识别不出来' : wine.data.wineNameCn }}
      </p>
    </div>
  </div>
  <div v-if="imageBase64 !== ''">
    <div v-if="isFinsh === false" btn p-x-10 @click="submit">
      识别
    </div>
    <div op75 m-t-3 cursor-pointer @click="reset">
      重选一张
    </div>
  </div>
</template>
