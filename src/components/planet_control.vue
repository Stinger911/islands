<template>
  <div class="fit row wrap justify-around items-start content-center">
    <q-btn-group outline class="self-center">
      <q-btn outline label="-" @click="onZoomOut" />
      <q-btn outline label="0" @click="onZoomZero" />
      <q-btn outline label="+" @click="onZoomIn" />
    </q-btn-group>
    <div class="column self-center">
      <q-btn
        v-if="hasHangar()"
        @click="onEnter()"
        class="self-center game-btn"
        flat
      >
        Enter Hangar
      </q-btn>
      <q-btn
        v-if="isBeacon()"
        @click="showStarmap()"
        class="self-center game-btn"
        flat
      >
        Look to stars
      </q-btn>
      <q-btn
        v-if="isJump()"
        @click="showJump()"
        class="self-center game-btn"
        flat
      >
        Find the path
      </q-btn>
    </div>
    <div
      class="row"
      style="
        background: url(./assets/images/btn_move.png);
        background-size: 100% 100%;
      "
    >
      <q-btn
        label="⬅️"
        flat
        class="self-center btn-move"
        style="padding-right: 0"
        @click="onMove5()"
      >
        <q-tooltip>⬅️, A</q-tooltip>
      </q-btn>
      <div class="column">
        <q-btn label="↖️" flat @click="onMove6()" class="btn-move">
          <q-tooltip>⬆️, W</q-tooltip>
        </q-btn>
        <q-btn label="↙️" flat @click="onMove4()" class="btn-move">
          <q-tooltip>Z</q-tooltip>
        </q-btn>
      </div>
      <div class="column">
        <q-btn label="↗️" flat @click="onMove1()" class="btn-move">
          <q-tooltip>E</q-tooltip>
        </q-btn>
        <q-btn label="↘️" flat @click="onMove3()" class="btn-move">
          <q-tooltip>⬇️, X</q-tooltip>
        </q-btn>
      </div>
      <q-btn
        label="➡️"
        flat
        class="self-center btn-move"
        style="padding-left: 0"
        @click="onMove2()"
      >
        <q-tooltip>➡️, D</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Game } from "src/game/main";
import { useGameStore } from "src/stores/game";
import { useMainStore } from "src/stores/main";
import { BldType, EntityType } from "src/game/entity";

export default {
  name: "PlanetControl",
  setup() {
    const game = useGameStore();
    const main = useMainStore();
    return {
      onEnter() {
        if (this.hasHangar()) {
          game.loc_bld = main.blds.idx;
          Game.events.emit("enter");
        }
      },
      showStarmap() {
        main.beforeMap = "PlanetView";
        Game.events.emit("stars");
      },
      showJump() {
        Game.events.emit("jump");
      },
      hasHangar() {
        return (
          main.blds !== false &&
          main.blds.typ === EntityType.BUILDING &&
          main.blds.sub === BldType.CITY
        );
      },
      isBeacon() {
        return (
          main.blds !== false &&
          main.blds.typ === EntityType.BUILDING &&
          main.blds.sub === BldType.BEACON
        );
      },
      isJump() {
        return (
          main.blds !== false &&
          main.blds.typ === EntityType.BUILDING &&
          main.blds.sub === BldType.POINT
        );
      },
      onZoomIn() {
        Game.events.emit("zoomIn");
      },
      onZoomOut() {
        Game.events.emit("zoomOut");
      },
      onZoomZero() {
        Game.events.emit("zoomReset");
      },
      onMove1() {
        Game.events.emit("onMove", 1);
      },
      onMove2() {
        Game.events.emit("onMove", 2);
      },
      onMove3() {
        Game.events.emit("onMove", 3);
      },
      onMove4() {
        Game.events.emit("onMove", 4);
      },
      onMove5() {
        Game.events.emit("onMove", 5);
      },
      onMove6() {
        Game.events.emit("onMove", 6);
      },
    };
  },
};
</script>

<style>
.btn-move {
  height: 3em;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
