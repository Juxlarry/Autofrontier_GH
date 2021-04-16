require "application_system_test_case"

class CarBodiesTest < ApplicationSystemTestCase
  setup do
    @car_body = car_bodies(:one)
  end

  test "visiting the index" do
    visit car_bodies_url
    assert_selector "h1", text: "Car Bodies"
  end

  test "creating a Car body" do
    visit car_bodies_url
    click_on "New Car Body"

    fill_in "Comments", with: @car_body.comments
    check "Status" if @car_body.status
    fill_in "Type name", with: @car_body.type_name
    click_on "Create Car body"

    assert_text "Car body was successfully created"
    click_on "Back"
  end

  test "updating a Car body" do
    visit car_bodies_url
    click_on "Edit", match: :first

    fill_in "Comments", with: @car_body.comments
    check "Status" if @car_body.status
    fill_in "Type name", with: @car_body.type_name
    click_on "Update Car body"

    assert_text "Car body was successfully updated"
    click_on "Back"
  end

  test "destroying a Car body" do
    visit car_bodies_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car body was successfully destroyed"
  end
end
