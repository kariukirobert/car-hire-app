<template>
    <Page>
        <ActionBar title="Vehicle Details" class="title" >
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <ActionItem :text="selectedVehicle" fontSize="18" color="white" />
            <ActionItem @tap="goHomePage" android.systemIcon="ic_menu_home" text="Home" android.position="actionBar" />
        </ActionBar>

        <GridLayout rows="auto, auto, 50, auto, *" class="main-content">
            <Image :src="vehicle.image" row="0" class="image" />
            <Label :text="vehicle.name" row="1" class="name" />
            <FlexboxLayout orientation="horizontal" row="2" class="extra" >
                <Label>
                    <FormattedString>
                        <Span text="Model: " class="text-span" />
                        <Span :text="vehicle.model" class="text" />
                    </FormattedString>
                </Label>
                <Button :text="[ isHired ? 'Hired' : 'Hire Vehicle']" class="hire" :class='[ isHired ? "btn-hired" : "btn-not-hired" ]' @tap="hireVehicle" />
            </FlexboxLayout>
            <StackLayout row="3">
                <Label>
                    <FormattedString>
                        <Span text="No. of Seats: " class="text-span" />
                        <Span :text="vehicle.no_of_seats" class="text" />
                    </FormattedString>
                </Label>
                <Label>
                    <FormattedString>
                        <Span text="Speed: " class="text-span" />
                        <Span :text="vehicle.speed" class="text" />
                    </FormattedString>
                </Label>
                <Label>
                    <FormattedString>
                        <Span text="Wheel Type: " class="text-span" />
                        <Span :text="vehicle.wheel_type" class="text" />
                    </FormattedString>
                </Label>
                <Label>
                    <FormattedString>
                        <Span text="Type: " class="text-span" />
                        <Span :text="vehicle.type" class="text" />
                    </FormattedString>
                </Label>
                <Label>
                    <FormattedString>
                        <Span text="Fuel Capacity: " class="text-span" />
                        <Span :text="vehicle.fuel" class="text" />
                    </FormattedString>
                </Label>
                <StackLayout class="description">
                    <Label text="Description" class="text" />
                    <Label :text="vehicle.desc" textWrap="true" row="4" class="desc" />
                </StackLayout>
            </StackLayout>
        </GridLayout>

    </Page>
</template>

<script>
    import homePage from './App'

    export default {
        props: ['vehicle'],
        data() {
            return {
                isHired: false,
            }
        },
        methods: {
            goHomePage() {
                this.$navigateTo(homePage)
            },
            hireVehicle() {
                if(this.isHired) {
                    this.$store.dispatch('remove_selected_hire_vehicle', this.vehicle.id)
                } else {
                    this.$store.dispatch('insert_selected_hire_vehicle', this.vehicle.id)
                }
                this.isHired = !this.isHired
            }
        },
        computed: {
            selectedVehicle() {
                if(this.$store.state.selectedHireVehicles.some(vehicle => vehicle.vehicle_id === this.vehicle.id)) {
                    this.isHired = true
                }
                return this.$store.state.selectedHireVehicles.length;
            }
        }
    }
</script>

<style lang="scss" scoped>
    ActionBar {
        background-color: #53ba82;
        text-transform: uppercase;
        text-align: center;
        font-weight: 800;
        color: #ffffff;
        font-style: italic;
        font-size: 24;
    }
    .main-content {
        padding: 15;
    }
    .extra {
        justify-content: space-between;
        margin-top: -7;
        align-items: center;
    }
    .name {
        font-size: 20;
        margin: 7 0;
        font-weight: 800;
    }
    .text {
        font-weight: 800;
    }
    .text-span, .text {
        font-size: 20;
    }
    .text-span {
        color: gray;
    }
    .hire {
        font-size: 20;
        // background-color: rgb(223, 87, 87);
        color: #ffffff;
        padding: 0 15 0 15;
        height: 38;
        border-radius: 10;
    }
    .btn-hired {
        background-color:  rgb(40, 157, 73);
        border-color: rgb(40, 157, 73);
    }
    .btn-not-hired {
        background-color:  rgb(223, 87, 87);
    }
    .desc {
        font-size: 20;
    }
    .description {
        margin-top: 20;
        color: gray;
    }
</style>