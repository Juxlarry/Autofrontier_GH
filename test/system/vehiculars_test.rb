require "application_system_test_case"

class VehicularsTest < ApplicationSystemTestCase
  setup do
    @vehicular = vehiculars(:one)
  end

  test "visiting the index" do
    visit vehiculars_url
    assert_selector "h1", text: "Vehiculars"
  end

  test "creating a Vehicular" do
    visit vehiculars_url
    click_on "New Vehicular"

    fill_in "Message", with: @vehicular.message
    click_on "Create Vehicular"

    assert_text "Vehicular was successfully created"
    click_on "Back"
  end

  test "updating a Vehicular" do
    visit vehiculars_url
    click_on "Edit", match: :first

    fill_in "Message", with: @vehicular.message
    click_on "Update Vehicular"

    assert_text "Vehicular was successfully updated"
    click_on "Back"
  end

  test "destroying a Vehicular" do
    visit vehiculars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Vehicular was successfully destroyed"
  end
end
