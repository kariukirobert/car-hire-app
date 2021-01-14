<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Car Hire"  col="1"/>
            </GridLayout>
        </ActionBar>

        <!-- <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>            
        </RadSideDrawer> -->
        <ListView for="vehicle in vehicles" @itemTap="vehicleDetails">
            <v-template>
                <StackLayout>
                    <StackLayout class="single-vehicle">
                        <Image :src="vehicle.image" class="image" />
                        <Label class="det name" :text="vehicle.name" width="100" />

                        <StackLayout orientation="horizontal" class="extra-info">
                            <Label class="det price" :text="`Price: ${vehicle.price}`" width="200" />
                            <Label class="det view" text="View Details" />
                        </StackLayout>
                    </StackLayout>
                </StackLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script >
    import VehicleDetails from "./VehicleDetails"
  export default {
    data() {
        return {
            vehicles: this.$store.state.vehicles
        }
    },
    methods: {
        vehicleDetails(event) {
            this.$navigateTo(VehicleDetails, {
                props: { 'vehicle': event.item}
            })
        }
    },
  }
</script>

<style scoped>
    Page {
        background-color: #cccccc;
    }
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: center;
        font-size: 24;
        font-weight: 800;
        font-style: italic;
        color: #ffffff;
    }

    .det {
        /* vertical-align: center; */
        /* text-align: center; */
        font-size: 18;
        color: #000;
        font-weight: 800;
    }
    .single-vehicle {
        background-color: #ffffff;
        margin-bottom: 15;
    }
    .name {
        margin-top: 10;
    }
    .extra-info {
        margin-bottom: -5;
    }
    .price {
        text-align: left;
        padding-left: 15;
    }
    .view {
        text-align: right;
        padding-right: 15;
        background: #0d77da;
        width: 130;
        color: #ffffff;
    }

</style>
