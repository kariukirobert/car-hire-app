<template>
    <Page>

        <ActionBar>
            <GridLayout width="100%" columns="*, 100">
                <Label class="title" text="Car Hire" col="0"/>
                <Label class="title" :text="selectedVehicle" col="1" />
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
        <GridLayout rows="55, *">
            <SearchBar hint="Search Vehicle" class="search" row="0" @submit="onSubmit" @loaded="onSearchBarLoaded" @returnKeyType="search" />

            <ListView for="vehicle in vehicles" row="1" @itemTap="vehicleDetails">
                <v-template>
                    <StackLayout>
                        <StackLayout class="single-vehicle">
                            <Image :src="vehicle.image" class="image" />
                            <Label class="det name" :text="vehicle.name" width="100" />

                            <!-- <StackLayout orientation="horizontal" class="extra-info">
                                <Label class="det price" :text="`Price: ${vehicle.price}`" width="200" />
                                <Label class="det view" text="View Details" />
                            </StackLayout> -->
                        </StackLayout>
                    </StackLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script >
    import VehicleDetails from "./VehicleDetails"
  export default {
    data() {
        return {
            vehicles: this.$store.state.vehicles,
        }
    },
    methods: {
        onSearchBarLoaded(event) {
            event.object.dismissSoftInput();
            event.object.android.clearFocus();
        },
        onSubmit() {
            //
        },
        vehicleDetails(event) {
            this.$navigateTo(VehicleDetails, {
                props: { 'vehicle': event.item}
            })
        }
    },
    computed: {
        selectedVehicle() {
            return (this.$store.state.hiredVehicle) != "" ? this.$store.state.hiredVehicle : 0;
        }
    }
  }
</script>

<style scoped>
    Page {
        background-color: lightgray;
        /* background-color: #cccccc; */
    }
    .search {
        font-size: 18;
        margin-top: 10;
        margin-left: 10;
        margin-right: 10;
        /* color: white */
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
        /* margin-bottom: 8; */
    }
    .name {
        margin-top: 10;
    }
    /* .extra-info {
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
    } */

</style>
