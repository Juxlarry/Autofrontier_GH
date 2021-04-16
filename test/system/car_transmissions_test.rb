require "application_system_test_case"

class CarTransmissionsTest < ApplicationSystemTestCase
  setup do
    @car_transmission = car_transmissions(:one)
  end

  test "visiting the index" do
    visit car_transmissions_url
    assert_selector "h1", text: "Car Transmissions"
  end

  test "creating a Car transmission" do
    visit car_transmissions_url
    click_on "New Car Transmission"

    fill_in "Comments", with: @car_transmission.comments
    fill_in "Name", with: @car_transmission.name
    check "Status" if @car_transmission.status
    click_on "Create Car transmission"

    assert_text "Car transmission was successfully created"
    click_on "Back"
  end

  test "updating a Car transmission" do
    visit car_transmissions_url
    click_on "Edit", match: :first

    fill_in "Comments", with: @car_transmission.comments
    fill_in "Name", with: @car_transmission.name
    check "Status" if @car_transmission.status
    click_on "Update Car transmission"

    assert_text "Car transmission was successfully updated"
    click_on "Back"
  end

  test "destroying a Car transmission" do
    visit car_transmissions_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car transmission was successfully destroyed"
  end
end
