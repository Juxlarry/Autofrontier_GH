require "application_system_test_case"

class CarEnginesTest < ApplicationSystemTestCase
  setup do
    @car_engine = car_engines(:one)
  end

  test "visiting the index" do
    visit car_engines_url
    assert_selector "h1", text: "Car Engines"
  end

  test "creating a Car engine" do
    visit car_engines_url
    click_on "New Car Engine"

    fill_in "Engine type", with: @car_engine.engine_type
    click_on "Create Car engine"

    assert_text "Car engine was successfully created"
    click_on "Back"
  end

  test "updating a Car engine" do
    visit car_engines_url
    click_on "Edit", match: :first

    fill_in "Engine type", with: @car_engine.engine_type
    click_on "Update Car engine"

    assert_text "Car engine was successfully updated"
    click_on "Back"
  end

  test "destroying a Car engine" do
    visit car_engines_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car engine was successfully destroyed"
  end
end
