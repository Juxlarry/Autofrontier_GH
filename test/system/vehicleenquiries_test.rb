require "application_system_test_case"

class VehicleenquiriesTest < ApplicationSystemTestCase
  setup do
    @vehicleenquiry = vehicleenquiries(:one)
  end

  test "visiting the index" do
    visit vehicleenquiries_url
    assert_selector "h1", text: "Vehicleenquiries"
  end

  test "creating a Vehicleenquiry" do
    visit vehicleenquiries_url
    click_on "New Vehicleenquiry"

    fill_in "Email", with: @vehicleenquiry.email
    fill_in "Enquirer user", with: @vehicleenquiry.enquirer_user_id
    fill_in "Firstname", with: @vehicleenquiry.firstname
    fill_in "Lastname", with: @vehicleenquiry.lastname
    fill_in "Message", with: @vehicleenquiry.message
    fill_in "Phonenumber", with: @vehicleenquiry.phonenumber
    check "Status" if @vehicleenquiry.status
    fill_in "Vehicle user", with: @vehicleenquiry.vehicle_user_id
    click_on "Create Vehicleenquiry"

    assert_text "Vehicleenquiry was successfully created"
    click_on "Back"
  end

  test "updating a Vehicleenquiry" do
    visit vehicleenquiries_url
    click_on "Edit", match: :first

    fill_in "Email", with: @vehicleenquiry.email
    fill_in "Enquirer user", with: @vehicleenquiry.enquirer_user_id
    fill_in "Firstname", with: @vehicleenquiry.firstname
    fill_in "Lastname", with: @vehicleenquiry.lastname
    fill_in "Message", with: @vehicleenquiry.message
    fill_in "Phonenumber", with: @vehicleenquiry.phonenumber
    check "Status" if @vehicleenquiry.status
    fill_in "Vehicle user", with: @vehicleenquiry.vehicle_user_id
    click_on "Update Vehicleenquiry"

    assert_text "Vehicleenquiry was successfully updated"
    click_on "Back"
  end

  test "destroying a Vehicleenquiry" do
    visit vehicleenquiries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Vehicleenquiry was successfully destroyed"
  end
end
