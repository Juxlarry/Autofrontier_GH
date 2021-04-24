require "application_system_test_case"

class CarDrivesTest < ApplicationSystemTestCase
  setup do
    @car_drife = car_drives(:one)
  end

  test "visiting the index" do
    visit car_drives_url
    assert_selector "h1", text: "Car Drives"
  end

  test "creating a Car drive" do
    visit car_drives_url
    click_on "New Car Drive"

    fill_in "Drive type", with: @car_drife.drive_type
    click_on "Create Car drive"

    assert_text "Car drive was successfully created"
    click_on "Back"
  end

  test "updating a Car drive" do
    visit car_drives_url
    click_on "Edit", match: :first

    fill_in "Drive type", with: @car_drife.drive_type
    click_on "Update Car drive"

    assert_text "Car drive was successfully updated"
    click_on "Back"
  end

  test "destroying a Car drive" do
    visit car_drives_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car drive was successfully destroyed"
  end
end
