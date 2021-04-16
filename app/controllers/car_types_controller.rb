class CarTypesController < ApplicationController
  before_action :set_car_type, only: %i[ show edit update destroy ]

  # GET /car_types or /car_types.json
  def index
    @car_types = CarType.all
  end

  # GET /car_types/1 or /car_types/1.json
  def show
  end

  # GET /car_types/new
  def new
    @car_type = CarType.new
  end

  # GET /car_types/1/edit
  def edit
  end

  # POST /car_types or /car_types.json
  def create
    @car_type = CarType.new(car_type_params)

    @all_types = CarType.all

    @count = 0
    # logger.info "All colours ::: #{@all_colour.inspect}"

    @type_typed = (@car_type.name).downcase
    logger.info "#{@type_typed}"

    @all_types.each do |type|

      @index_type = (type.name).downcase

      if @index_type == @type_typed

        @count += 1

      end 


      logger.info "#{@index_type} --- car type from loop"

    end 

    logger.info "Count details -- #{ @count}"
    logger.info "Car transmission details -- #{@car_type.inspect}"

    respond_to do |format|
      if @count < 1
        @car_type.save
        format.html { redirect_to car_types_path, notice: "Car type was successfully created." }
        format.json { render :show, status: :created, location: @car_type }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_types/1 or /car_types/1.json
  def update
    respond_to do |format|
      if @car_type.update(car_type_params)
        format.html { redirect_to @car_type, notice: "Car type was successfully updated." }
        format.json { render :show, status: :ok, location: @car_type }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_types/1 or /car_types/1.json
  def destroy
    @car_type.destroy
    respond_to do |format|
      format.html { redirect_to car_types_url, notice: "Car type was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_type
      @car_type = CarType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_type_params
      params.require(:car_type).permit(:name, :status, :comments)
    end
end
