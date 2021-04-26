class CarCylindersController < ApplicationController
  before_action :set_car_cylinder, only: %i[ show edit update destroy ]

  # GET /car_cylinders or /car_cylinders.json
  def index
    @car_cylinders = CarCylinder.all
  end

  # GET /car_cylinders/1 or /car_cylinders/1.json
  def show
  end

  # GET /car_cylinders/new
  def new
    @car_cylinder = CarCylinder.new
  end

  # GET /car_cylinders/1/edit
  def edit
  end

  # POST /car_cylinders or /car_cylinders.json
  def create
    @car_cylinder = CarCylinder.new(car_cylinder_params)

    @all_cylinders = CarCylinder.all

    @count = 0
    # logger.info "All colours ::: #{@all_colour.inspect}"

    @cylinder_typed = (@car_cylinder.cylinder)
    logger.info "#{@cylinder_typed}"

    @all_cylinders.each do |cylinder|

      @index_cylinder = (cylinder.cylinder)

      if @index_cylinder == @cylinder_typed

        @count += 1

      end 

      logger.info "#{@index_cylinder} --- make from loop"

    end 

    logger.info "Count details -- #{ @count}"
    logger.info "Car cylinders details -- #{ @car_cylinder.inspect}"

    respond_to do |format|
      if @count < 1 
        @car_cylinder.save
        format.html { redirect_to car_cylinders_path, notice: "Car cylinder was successfully created." }
        format.json { render :show, status: :created, location: @car_cylinder }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_cylinder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_cylinders/1 or /car_cylinders/1.json
  def update
    respond_to do |format|
      if @car_cylinder.update(car_cylinder_params)
        format.html { redirect_to @car_cylinder, notice: "Car cylinder was successfully updated." }
        format.json { render :show, status: :ok, location: @car_cylinder }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_cylinder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_cylinders/1 or /car_cylinders/1.json
  def destroy
    @car_cylinder.destroy
    respond_to do |format|
      format.html { redirect_to car_cylinders_url, notice: "Car cylinder was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_cylinder
      @car_cylinder = CarCylinder.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_cylinder_params
      params.require(:car_cylinder).permit(:cylinder)
    end
end
