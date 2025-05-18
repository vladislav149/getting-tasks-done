import type {VOptions} from 'vuetify-nuxt-module'

export const vuetifyOptions: VOptions = {
  icons: {
    defaultSet: 'mdi-svg',
    svg: {
      mdi: {
        aliases: {
          // accountArrowLeft: 'mdiAccountArrowLeft',
          // accountArrowRight: 'mdiAccountArrowRight',
          // book: 'mdiBook',
          // exit: 'mdiExitToApp',
          // pencil: 'mdiPencil',
          // nuxt: 'mdiNuxt',
          magnify: 'mdiMagnify',
          filter: 'mdiFilter',
          dotsVertical: 'mdiDotsVertical',
          add: 'mdiPlusCircle',
          newBox: 'mdiNewBox',
          logout: 'mdiLogout',
          close: 'mdiClose',
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'lg',
    thresholds: {
      xs: 0,
      sm: 540,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  defaults: {
    VCard: {
      elevation: 5,
    },
  },
  ssr: {
    clientWidth: 540,
    clientHeight: 540,
  },
}
