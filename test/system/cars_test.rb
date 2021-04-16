require "application_system_test_case"

class CarsTest < ApplicationSystemTestCase
  setup do
    @car = cars(:one)
  end

  test "visiting the index" do
    visit cars_url
    assert_selector "h1", text: "Cars"
  end

  test "creating a Car" do
    visit cars_url
    click_on "New Car"

    fill_in "Body type", with: @car.body_type_id
    fill_in "Car name", with: @car.car_name
    fill_in "Car price", with: @car.car_price
    fill_in "Car registration first date", with: @car.car_registration_first_date
    fill_in "Car registration number", with: @car.car_registration_number
    fill_in "Car type", with: @car.car_type_id
    fill_in "Colour", with: @car.colour_id
    fill_in "Comments", with: @car.comments
    fill_in "Derivative details", with: @car.derivative_details
    fill_in "Description", with: @car.description
    fill_in "Doors", with: @car.doors
    fill_in "Fuel type", with: @car.fuel_type_id
    fill_in "Make", with: @car.make_id
    fill_in "Mileage", with: @car.mileage
    fill_in "Model", with: @car.model_id
    fill_in "Seats", with: @car.seats
    check "Status" if @car.status
    fill_in "Transmission type", with: @car.transmission_type_id
    fill_in "Trim details", with: @car.trim_details
    fill_in "Variant details", with: @car.variant_details
    click_on "Create Car"

    assert_text "Car was successfully created"
    click_on "Back"
  end

  test "updating a Car" do
    visit cars_url
    click_on "Edit", match: :first

    fill_in "Body type", with: @car.body_type_id
    fill_in "Car name", with: @car.car_name
    fill_in "Car price", with: @car.car_price
    fill_in "Car registration first date", with: @car.car_registration_first_date
    fill_in "Car registration number", with: @car.car_registration_number
    fill_in "Car type", with: @car.car_type_id
    fill_in "Colour", with: @car.colour_id
    fill_in "Comments", with: @car.comments
    fill_in "Derivative details", with: @car.derivative_details
    fill_in "Description", with: @car.description
    fill_in "Doors", with: @car.doors
    fill_in "Fuel type", with: @car.fuel_type_id
    fill_in "Make", with: @car.make_id
    fill_in "Mileage", with: @car.mileage
    fill_in "Model", with: @car.model_id
    fill_in "Seats", with: @car.seats
    check "Status" if @car.status
    fill_in "Transmission type", with: @car.transmission_type_id
    fill_in "Trim details", with: @car.trim_details
    fill_in "Variant details", with: @car.variant_details
    click_on "Update Car"

    assert_text "Car was successfully updated"
    click_on "Back"
  end

  test "destroying a Car" do
    visit cars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car was successfully destroyed"
  end
end
