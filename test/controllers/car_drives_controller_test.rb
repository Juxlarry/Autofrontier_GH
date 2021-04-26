require "test_helper"

class CarDrivesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_drife = car_drives(:one)
  end

  test "should get index" do
    get car_drives_url
    assert_response :success
  end

  test "should get new" do
    get new_car_drife_url
    assert_response :success
  end

  test "should create car_drife" do
    assert_difference('CarDrive.count') do
      post car_drives_url, params: { car_drife: { drive_type: @car_drife.drive_type } }
    end

    assert_redirected_to car_drife_url(CarDrive.last)
  end

  test "should show car_drife" do
    get car_drife_url(@car_drife)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_drife_url(@car_drife)
    assert_response :success
  end

  test "should update car_drife" do
    patch car_drife_url(@car_drife), params: { car_drife: { drive_type: @car_drife.drive_type } }
    assert_redirected_to car_drife_url(@car_drife)
  end

  test "should destroy car_drife" do
    assert_difference('CarDrive.count', -1) do
      delete car_drife_url(@car_drife)
    end

    assert_redirected_to car_drives_url
  end
end
