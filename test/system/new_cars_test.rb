require "application_system_test_case"

class NewCarsTest < ApplicationSystemTestCase
  setup do
    @new_car = new_cars(:one)
  end

  test "visiting the index" do
    visit new_cars_url
    assert_selector "h1", text: "New Cars"
  end

  test "creating a New car" do
    visit new_cars_url
    click_on "New New Car"

    fill_in "Car brand", with: @new_car.car_brand_id
    fill_in "Car name", with: @new_car.car_name
    fill_in "Car specification", with: @new_car.car_specification_id
    fill_in "Comments", with: @new_car.comments
    fill_in "Description", with: @new_car.description
    fill_in "Price", with: @new_car.price
    check "Status" if @new_car.status
    click_on "Create New car"

    assert_text "New car was successfully created"
    click_on "Back"
  end

  test "updating a New car" do
    visit new_cars_url
    click_on "Edit", match: :first

    fill_in "Car brand", with: @new_car.car_brand_id
    fill_in "Car name", with: @new_car.car_name
    fill_in "Car specification", with: @new_car.car_specification_id
    fill_in "Comments", with: @new_car.comments
    fill_in "Description", with: @new_car.description
    fill_in "Price", with: @new_car.price
    check "Status" if @new_car.status
    click_on "Update New car"

    assert_text "New car was successfully updated"
    click_on "Back"
  end

  test "destroying a New car" do
    visit new_cars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "New car was successfully destroyed"
  end
end
