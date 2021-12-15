<template>
  <section class="section">
    <div class="tw-container">
      <div class="text">
        <h1>Добро пожаловать.</h1>
        <p>Итак, первое задание пройдено, ты запустил(а) проект. Поздравляю!</p>
        <p>
          Для системного ознакомления с тем, что творится с фронтендом в be7team, <nuxt-link :to="localePath({ name: 'docs' })">
            переходи в README
          </nuxt-link>. На этой же странице и на тех, что создашь позже, ты сможешь параллельно поизвращаться над тем, о чём прочитал(а): компонентами, интернационализацией, стилями, темами и всем, что найдёшь.
        </p>
        <p>И да, не стесняйся писать <a href="https://t.me/pyncz" target="_blank">мне</a>, если возникнут вопросы (будет странно, если бы не возникли).</p>
        <hr>
        <p>
          Если ты уже пробрался(ась) через <nuxt-link :to="localePath({ name: 'docs' })">
            README
          </nuxt-link> или ты фанат Шопенгауэра и признаёшь познание только через страдание, идём дальше.
        </p>
        <p>
          Ниже на этой странице - пример работы с <nuxt-link :to="localePath({ name: 'docs', hash: '#arch' })">
            архитектурой
          </nuxt-link> фронта (в частности, стором и сервисами). Здесь используется АПИ dev сервера нашего NFT маркетплейса <a href="https://app.picipo.io" target="_blank">Picipo</a>. Посмотреть документацию к АПИ можно <a href="https://app.picipo.io/swagger" target="_blank">здесь</a>.
        </p>
        <p>Хорошим решением будет, пожалуй, пойти сейчас в код и посмотреть, как всё работает. А план дальнейшего приключения примерно такой:</p>
        <ul>
          <li>
            Пощупать компоненты, добавить в карточку какой-то элемент. Скажем, компонент-превью коллекции будет в самый раз.
          </li>
          <li>
            Залезть в модели, сервисы и стор. Глянуть в сваггер и расширить модели работ.
          </li>
          <li>
            Создать новый роут для обзора листа коллекций.
          </li>
          <li>
            Создать роут для получения и обзора отдельной коллекции.
          </li>
          <li>
            Найти в сваггере понравившуюся сущность и попробовать с нуля создать для её обслуживания модели/сервисы/стор и страницу.
          </li>
        </ul>
        <p>Удачи и добро пожаловать в код!</p>
      </div>
    </div>
    <hr class="tw-my-16 tw-text-dim-3">
    <div class="tw-container tw-py-12 tw-space-y-12">
      <h2>Artworks</h2>
      <lazy-list
        trigger="mounted"
        list-class="tw-grid tw-grid-cols-cards"
        :action="$modules.items.read"
        :placeholders="4"
        :infinite-scroll="true"
      >
        <template #item="item">
          <div>
            {{ item.title }}
          </div>
        </template>
      </lazy-list>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HomePage extends Vue {
  async mounted() {
    const items = (await this.$modules.items.read()).data?.results || []
    console.log(items)
    console.log((await this.$modules.collections.get({ id: items[0].collections[0].id })).data)
  }
}
</script>

<style lang="scss" scoped>
.section {
  @apply tw-py-32;
}
</style>
