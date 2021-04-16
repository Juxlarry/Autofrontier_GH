require "application_system_test_case"

class UsedCarsTest < ApplicationSystemTestCase
  setup do
    @used_car = used_cars(:one)
  end

  test "visiting the index" do
    visit used_cars_url
    assert_selector "h1", text: "Used Cars"
  end

  test "creating a Used car" do
    visit used_cars_url
    click_on "New Used Car"

    fill_in "Car brand", with: @used_car.car_brand_id
    fill_in "Car name", with: @used_car.car_name
    fill_in "Car specification", with: @used_car.car_specification_id
    fill_in "Comments", with: @used_car.comments
    fill_in "Description", with: @used_car.description
    fill_in "Price", with: @used_car.price
    check "Status" if @used_car.status
    click_on "Create Used car"

    assert_text "Used car was successfully created"
    click_on "Back"
  end

  test "updating a Used car" do
    visit used_cars_url
    click_on "Edit", match: :first

    fill_in "Car brand", with: @used_car.car_brand_id
    fill_in "Car name", with: @used_car.car_name
    fill_in "Car specification", with: @used_car.car_specification_id
    fill_in "Comments", with: @used_car.comments
    fill_in "Description", with: @used_car.description
    fill_in "Price", with: @used_car.price
    check "Status" if @used_car.status
    click_on "Update Used car"

    assert_text "Used car was successfully updated"
    click_on "Back"
  end

  test "destroying a Used car" do
    visit used_cars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Used car was successfully destroyed"
  end
end
