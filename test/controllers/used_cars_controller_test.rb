require "test_helper"

class UsedCarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @used_car = used_cars(:one)
  end

  test "should get index" do
    get used_cars_url
    assert_response :success
  end

  test "should get new" do
    get new_used_car_url
    assert_response :success
  end

  test "should create used_car" do
    assert_difference('UsedCar.count') do
      post used_cars_url, params: { used_car: { car_brand_id: @used_car.car_brand_id, car_name: @used_car.car_name, car_specification_id: @used_car.car_specification_id, comments: @used_car.comments, description: @used_car.description, price: @used_car.price, status: @used_car.status } }
    end

    assert_redirected_to used_car_url(UsedCar.last)
  end

  test "should show used_car" do
    get used_car_url(@used_car)
    assert_response :success
  end

  test "should get edit" do
    get edit_used_car_url(@used_car)
    assert_response :success
  end

  test "should update used_car" do
    patch used_car_url(@used_car), params: { used_car: { car_brand_id: @used_car.car_brand_id, car_name: @used_car.car_name, car_specification_id: @used_car.car_specification_id, comments: @used_car.comments, description: @used_car.description, price: @used_car.price, status: @used_car.status } }
    assert_redirected_to used_car_url(@used_car)
  end

  test "should destroy used_car" do
    assert_difference('UsedCar.count', -1) do
      delete used_car_url(@used_car)
    end

    assert_redirected_to used_cars_url
  end
end
