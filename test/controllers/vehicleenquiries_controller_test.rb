require "test_helper"

class VehicleenquiriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vehicleenquiry = vehicleenquiries(:one)
  end

  test "should get index" do
    get vehicleenquiries_url
    assert_response :success
  end

  test "should get new" do
    get new_vehicleenquiry_url
    assert_response :success
  end

  test "should create vehicleenquiry" do
    assert_difference('Vehicleenquiry.count') do
      post vehicleenquiries_url, params: { vehicleenquiry: { email: @vehicleenquiry.email, enquirer_user_id: @vehicleenquiry.enquirer_user_id, firstname: @vehicleenquiry.firstname, lastname: @vehicleenquiry.lastname, message: @vehicleenquiry.message, phonenumber: @vehicleenquiry.phonenumber, status: @vehicleenquiry.status, vehicle_user_id: @vehicleenquiry.vehicle_user_id } }
    end

    assert_redirected_to vehicleenquiry_url(Vehicleenquiry.last)
  end

  test "should show vehicleenquiry" do
    get vehicleenquiry_url(@vehicleenquiry)
    assert_response :success
  end

  test "should get edit" do
    get edit_vehicleenquiry_url(@vehicleenquiry)
    assert_response :success
  end

  test "should update vehicleenquiry" do
    patch vehicleenquiry_url(@vehicleenquiry), params: { vehicleenquiry: { email: @vehicleenquiry.email, enquirer_user_id: @vehicleenquiry.enquirer_user_id, firstname: @vehicleenquiry.firstname, lastname: @vehicleenquiry.lastname, message: @vehicleenquiry.message, phonenumber: @vehicleenquiry.phonenumber, status: @vehicleenquiry.status, vehicle_user_id: @vehicleenquiry.vehicle_user_id } }
    assert_redirected_to vehicleenquiry_url(@vehicleenquiry)
  end

  test "should destroy vehicleenquiry" do
    assert_difference('Vehicleenquiry.count', -1) do
      delete vehicleenquiry_url(@vehicleenquiry)
    end

    assert_redirected_to vehicleenquiries_url
  end
end
