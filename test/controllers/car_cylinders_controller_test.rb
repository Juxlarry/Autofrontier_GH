require "test_helper"

class CarCylindersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_cylinder = car_cylinders(:one)
  end

  test "should get index" do
    get car_cylinders_url
    assert_response :success
  end

  test "should get new" do
    get new_car_cylinder_url
    assert_response :success
  end

  test "should create car_cylinder" do
    assert_difference('CarCylinder.count') do
      post car_cylinders_url, params: { car_cylinder: { cylinder: @car_cylinder.cylinder } }
    end

    assert_redirected_to car_cylinder_url(CarCylinder.last)
  end

  test "should show car_cylinder" do
    get car_cylinder_url(@car_cylinder)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_cylinder_url(@car_cylinder)
    assert_response :success
  end

  test "should update car_cylinder" do
    patch car_cylinder_url(@car_cylinder), params: { car_cylinder: { cylinder: @car_cylinder.cylinder } }
    assert_redirected_to car_cylinder_url(@car_cylinder)
  end

  test "should destroy car_cylinder" do
    assert_difference('CarCylinder.count', -1) do
      delete car_cylinder_url(@car_cylinder)
    end

    assert_redirected_to car_cylinders_url
  end
end
