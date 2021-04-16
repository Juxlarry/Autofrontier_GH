require "application_system_test_case"

class CarColoursTest < ApplicationSystemTestCase
  setup do
    @car_colour = car_colours(:one)
  end

  test "visiting the index" do
    visit car_colours_url
    assert_selector "h1", text: "Car Colours"
  end

  test "creating a Car colour" do
    visit car_colours_url
    click_on "New Car Colour"

    fill_in "Comments", with: @car_colour.comments
    fill_in "Name", with: @car_colour.name
    check "Status" if @car_colour.status
    click_on "Create Car colour"

    assert_text "Car colour was successfully created"
    click_on "Back"
  end

  test "updating a Car colour" do
    visit car_colours_url
    click_on "Edit", match: :first

    fill_in "Comments", with: @car_colour.comments
    fill_in "Name", with: @car_colour.name
    check "Status" if @car_colour.status
    click_on "Update Car colour"

    assert_text "Car colour was successfully updated"
    click_on "Back"
  end

  test "destroying a Car colour" do
    visit car_colours_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car colour was successfully destroyed"
  end
end
