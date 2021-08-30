<template>
  <q-page class="flex flex-center"  style="background: url('/background02.jpg')">
    <div class="column">
      <img
        alt="logo"
        src="~assets/island.png"
        style="width: 200px; height: 200px"
        />
      <q-btn to="/game" color="primary" glossy class="q-mt-sm">
        Start new game
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPage',
  setup () {
    function linkClick (e, go) {
      e.preventDefault() // we choose when we navigate

      // console.log('triggering navigation in 3s')
      setTimeout(() => {
        // console.log('navigating as promised 3s ago')
        go()
      }, 3000)
    }

    function buttonProps ({ href, route, isActive, isExactActive }) {
      const props = {
        color: 'black',
        noCaps: true,
        label: `To "${route.fullPath}"`,
        outline: true,
        to: href
      }

      if (isActive === true) {
        props.color = isExactActive === true ? 'primary' : 'amber-9'
      }
      else {
        props.color = 'black'
      }

      return props
    }

    return {
      linkClick,
      buttonProps
    }
  },
  methods: {
  }
})
</script>
