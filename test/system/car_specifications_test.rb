require "application_system_test_case"

class CarSpecificationsTest < ApplicationSystemTestCase
  setup do
    @car_specification = car_specifications(:one)
  end

  test "visiting the index" do
    visit car_specifications_url
    assert_selector "h1", text: "Car Specifications"
  end

  test "creating a Car specification" do
    visit car_specifications_url
    click_on "New Car Specification"

    fill_in "Body type", with: @car_specification.body_type
    fill_in "Car", with: @car_specification.car_id
    fill_in "Comments", with: @car_specification.comments
    fill_in "Description", with: @car_specification.description
    fill_in "Doors", with: @car_specification.doors
    fill_in "Fuel", with: @car_specification.fuel
    fill_in "Gear type", with: @car_specification.gear_type
    fill_in "Mileage", with: @car_specification.mileage
    fill_in "Seats", with: @car_specification.seats
    check "Status" if @car_specification.status
    click_on "Create Car specification"

    assert_text "Car specification was successfully created"
    click_on "Back"
  end

  test "updating a Car specification" do
    visit car_specifications_url
    click_on "Edit", match: :first

    fill_in "Body type", with: @car_specification.body_type
    fill_in "Car", with: @car_specification.car_id
    fill_in "Comments", with: @car_specification.comments
    fill_in "Description", with: @car_specification.description
    fill_in "Doors", with: @car_specification.doors
    fill_in "Fuel", with: @car_specification.fuel
    fill_in "Gear type", with: @car_specification.gear_type
    fill_in "Mileage", with: @car_specification.mileage
    fill_in "Seats", with: @car_specification.seats
    check "Status" if @car_specification.status
    click_on "Update Car specification"

    assert_text "Car specification was successfully updated"
    click_on "Back"
  end

  test "destroying a Car specification" do
    visit car_specifications_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car specification was successfully destroyed"
  end
end
