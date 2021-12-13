import { Plugin } from '@nuxt/types'
import { getModule } from 'vuex-module-decorators'
import {
  ArtworkStore,
  AuthStore,
  InfoStore,
  IStore,
  IStoreModules,
  TagStore,
  UserStore,
  AuctionStore,
  SaleStore,
  ChatStore,
  MessagesStore,
  CreatorStore,
  MediaStore,
  CollectionStore,
  CreateArtworkStore,
  ExploreItemsStore,
  ExploreCollectionsStore,
  ExploreUsersStore,
  BidStore,
  MeStore,
  FollowingStore,
  CollectionAuthorStore,
  ArtworkAuthorStore,
  SystemStore,
  BookmarksArtworksStore,
  BookmarksCollectionsStore,
} from '~/store-modules'

declare module 'vuex-module-decorators' {
  interface VuexModule {
    store: IStore
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $modules: IStoreModules
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $modules: IStoreModules
  }

  interface Context {
    $modules: IStoreModules
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $modules: IStoreModules
  }
}

const storeRegister: Plugin = ({ store }, inject) => {
  store.registerModule('auth', AuthStore)
  store.registerModule('artwork', ArtworkStore)
  store.registerModule('artwork/author', ArtworkAuthorStore)
  store.registerModule('artwork/collection/all', CollectionStore)
  store.registerModule('artwork/collection/author', CollectionAuthorStore)
  store.registerModule('tag', TagStore)
  store.registerModule('info', InfoStore)
  store.registerModule('user', UserStore)
  store.registerModule('profile/me', MeStore)
  store.registerModule('profile/following', FollowingStore)
  store.registerModule('profile/bookmarks/artworks', BookmarksArtworksStore)
  store.registerModule(
    'profile/bookmarks/collections',
    BookmarksCollectionsStore,
  )
  store.registerModule('selling/auction', AuctionStore)
  store.registerModule('selling/auction/bid', BidStore)
  store.registerModule('selling/sale', SaleStore)
  store.registerModule('chat/chat', ChatStore)
  store.registerModule('chat/messages', MessagesStore)
  store.registerModule('moderation/creator', CreatorStore)
  store.registerModule('moderation/artwork', CreateArtworkStore)
  store.registerModule('media', MediaStore)
  store.registerModule('explore/items', ExploreItemsStore)
  store.registerModule('explore/collections', ExploreCollectionsStore)
  store.registerModule('explore/users', ExploreUsersStore)
  store.registerModule('system', SystemStore)

  const $modules = {
    auth: getModule(AuthStore, store),
    artwork: getModule(ArtworkStore, store),
    author: getModule(ArtworkAuthorStore, store),
    collection: {
      all: getModule(CollectionStore, store),
      author: getModule(CollectionAuthorStore, store),
    },
    tag: getModule(TagStore, store),
    info: getModule(InfoStore, store),
    user: getModule(UserStore, store),
    profile: {
      me: getModule(MeStore, store),
      following: getModule(FollowingStore, store),
      bookmarks: {
        artworks: getModule(BookmarksArtworksStore, store),
        collections: getModule(BookmarksCollectionsStore, store),
      },
    },
    selling: {
      auction: getModule(AuctionStore, store),
      sale: getModule(SaleStore, store),
      bid: getModule(BidStore, store),
    },
    moderation: {
      creator: getModule(CreatorStore, store),
      artwork: getModule(CreateArtworkStore, store),
    },
    media: getModule(MediaStore, store),
    chats: {
      chat: getModule(ChatStore, store),
      messages: getModule(MessagesStore, store),
    },
    explore: {
      items: getModule(ExploreItemsStore, store),
      collections: getModule(ExploreCollectionsStore, store),
      users: getModule(ExploreUsersStore, store),
    },
    system: getModule(SystemStore, store),
  } as IStoreModules
  inject('modules', $modules)
}

export default storeRegister
