require "application_system_test_case"

class CarCylindersTest < ApplicationSystemTestCase
  setup do
    @car_cylinder = car_cylinders(:one)
  end

  test "visiting the index" do
    visit car_cylinders_url
    assert_selector "h1", text: "Car Cylinders"
  end

  test "creating a Car cylinder" do
    visit car_cylinders_url
    click_on "New Car Cylinder"

    fill_in "Cylinder", with: @car_cylinder.cylinder
    click_on "Create Car cylinder"

    assert_text "Car cylinder was successfully created"
    click_on "Back"
  end

  test "updating a Car cylinder" do
    visit car_cylinders_url
    click_on "Edit", match: :first

    fill_in "Cylinder", with: @car_cylinder.cylinder
    click_on "Update Car cylinder"

    assert_text "Car cylinder was successfully updated"
    click_on "Back"
  end

  test "destroying a Car cylinder" do
    visit car_cylinders_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car cylinder was successfully destroyed"
  end
end
